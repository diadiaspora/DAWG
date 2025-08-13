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

async function logIn(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json({ message: "Bad Credentials" });
  }
}

async function signUp(req, res) {
  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      ...req.body,
      verificationToken,
    });

    await Profile.create({
      author: user._id,
      name: user.name,
      avatar: user.avatar,
    });

    const verifyUrl = `${process.env.SERVER_URL}/api/auth/verify/${verificationToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Your App" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Verify your email",
        html: `<p>Please verify your email by clicking <a href="${verifyUrl}">here</a>.</p>`,
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      // Still return success so the user can try verifying later
      return res.status(200).json({
        message:
          "Account created, but verification email could not be sent. Contact support.",
      });
    }

    res
      .status(200)
      .json({ message: "Check your email to verify your account" });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    res.status(500).json({ message: "Server error" });
  }
}


async function verifyEmail(req, res) {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).json({ message: "Invalid token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect to frontend login with success flag
    res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

/*--- Helper Functions ---*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
