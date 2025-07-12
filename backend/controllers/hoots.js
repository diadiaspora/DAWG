const Hoot = require("../models/hoot.js");

module.exports = {
  create,
  index,
  show,
  update,
  comment,
  deleteHoot,
  likeHoot,
  unlikeHoot,
  likeComment,
  unlikeComment,
};

async function create(req, res) {
  try {
    const Profile = require("../models/profile");
    const profile = await Profile.findOne({ author: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    req.body.author = profile._id;

    if (req.file) {
      req.body.imageUrl = await uploadFile(req.file);
    }
    const hoot = await Hoot.create(req.body);
    await hoot.populate("author");

    res.json(hoot);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Create Hoot Failed" });
  }
}

async function index(req, res) {
  try {
    const Profile = require("../models/profile");
    const hoots = await Hoot.find({})
      .populate("author")
      .sort({ createdAt: -1 });
    
    
     

      res.json(hoots);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch hoots" });
  }
}

async function show(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.id).populate([
      "author",
      "comments.author",
    ]);

    res.json(hoot);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to show hoot" });
  }
}

async function update(req, res) {
  try {


    const hoot = await Hoot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hoot) {
      return res.status(404).json({ message: "Hoot not found for update" });
    }

    res.json(hoot);
  } catch (err) {
    console.error("Failed to update hoot:", err);
    res.status(500).json({ message: "Failed to update hoot." });
  }
}

async function comment(req, res) {
  try {
    req.body.author = req.user._id;
   
    const hoot = await Hoot.findById(req.params.id);
  
    hoot.comments.push(req.body);
    await hoot.save();

    const newComment = hoot.comments[hoot.comments.length - 1];

    newComment._doc.author = req.user;

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function deleteHoot(req, res) {
  try {
    const hoot = await Hoot.findByIdAndDelete(req.params.id);
    if (!hoot) {
      return res.status(404).json({ message: "Hoot not found for deletion" });
    }
    res.json(hoot);
  } catch (err) {
    console.error("Error in hoot delete:", err);
    res
      .status(500)
      .json({ message: "Failed to delete hoot", error: err.message });
  }
}

async function likeHoot(req, res) {
  try {
    const profileId = req.user._id;

    const hoot = await Hoot.findById(req.params.id);
    if (!hoot) return res.status(404).json({ message: "Hoot not found" });

    if (!hoot.likes.includes(profileId)) {
      hoot.likes.push(profileId);
      await hoot.save();
    }

    await hoot.populate("author"); // 🔥 Add this

    res.status(200).json(hoot); // 🔥 Return full hoot
  } catch (err) {
    console.error("Error liking hoot:", err);
    res.status(500).json({ message: "Failed to like hoot" });
  }
}


async function unlikeHoot(req, res) {
  try {
    const profileId = req.user._id;

    const hoot = await Hoot.findById(req.params.id);
    if (!hoot) return res.status(404).json({ message: "Hoot not found" });

    hoot.likes = hoot.likes.filter(
      (id) => id.toString() !== profileId.toString()
    );
    await hoot.save();

    await hoot.populate("author"); // 🔥 Add this

    res.status(200).json(hoot); // 🔥 Return full hoot
  } catch (err) {
    console.error("Error unliking hoot:", err);
    res.status(500).json({ message: "Failed to unlike hoot" });
  }
}

async function likeComment(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    if (!hoot) return res.status(404).json({ message: "Hoot not found" });

    const comment = hoot.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const userId = req.user._id;

    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
      await hoot.save();
    }

    res.status(200).json({ likes: comment.likes });
  } catch (err) {
    console.error("Error liking comment:", err);
    res.status(500).json({ message: "Failed to like comment" });
  }
}

async function unlikeComment(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    if (!hoot) return res.status(404).json({ message: "Hoot not found" });

    const comment = hoot.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const userId = req.user._id;

    comment.likes = comment.likes.filter(
      (id) => id.toString() !== userId.toString()
    );

    await hoot.save();

    res.status(200).json({ likes: comment.likes });
  } catch (err) {
    console.error("Error unliking comment:", err);
    res.status(500).json({ message: "Failed to unlike comment" });
  }
}
