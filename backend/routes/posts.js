const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

router.use(ensureLoggedIn);

router.post("/", postsCtrl.create);
router.get("/", postsCtrl.index);
router.get("/:id", postsCtrl.show);
router.put("/:id", postsCtrl.update);
router.put("/:id/like", postsCtrl.likePost);

module.exports = router;
