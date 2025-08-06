const User = require("../models/user");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports = {
  signUp,
  logIn,
  verifyEmail,
  
};

const transporter = nodemailer.createTransport({
  service: "Gmail", // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


async function signUp(req, res) {
  try {
    console.log("Signup data received:", req.body);

    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    const verifyToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password,
      isVerified: false,
      verifyToken,
    });

    await Profile.create({
      author: user._id,
      name: user.name,
      avatar: user.avatar,
    });

    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000"; // fallback to localhost in dev
    const verifyLink = `${FRONTEND_URL}/verify?token=${verifyToken}`;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Please confirm your email",
        html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      // Continue without failing signup
    }

    // Create JWT token here and send it back in response
    const token = createJWT(user);

    res.status(201).json({
      token,
      message: "Check your email to verify your account.",
    });
  } catch (err) {
    console.error("Signup error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already registered." });
    }
    res.status(400).json({ message: "Signup failed." });
  }
}


async function logIn(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found");
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email before logging in." });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Incorrect password");

    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.error("Login error:", err);
    res.status(400).json({ message: "Bad Credentials" });
  }
}

async function verifyEmail(req, res) {
  try {
    const { token } = req.query;
    const user = await User.findOne({ verifyToken: token });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token." });

    user.isVerified = true;
    user.verifyToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully." });
  } catch (err) {
    console.error("Verify email error:", err);
    res.status(500).json({ message: "Error verifying email." });
  }
}

/*--- Helper Functions ---*/

function createJWT(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET || process.env.SECRET, {
    expiresIn: "24h",
  });
}
