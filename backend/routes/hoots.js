const express = require("express");
const router = express.Router();
const hootsCtrl = require("../controllers/hoots");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

router.get("/", hootsCtrl.index);
router.get("/:id", hootsCtrl.show);

router.use(ensureLoggedIn);

router.post("/", hootsCtrl.create);
router.post("/:id/comments", hootsCtrl.comment);


router.put("/:id", hootsCtrl.update);
router.delete("/:id", hootsCtrl.deleteHoot);

module.exports = router;
