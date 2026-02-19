const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../multerconfig/storageConfig");

// routes
router.post("/register", upload.single("user_profile"), userController.userpost);
router.get("/details", userController.userget);
router.get("/export", userController.userexport);
router.get("/:id", userController.singleuserget);
router.put("/edit/:id", upload.single("user_profile"), userController.useredit);
router.delete("/delete/:id", userController.userdelete);
router.put("/status/:id", userController.userstatus);

module.exports = router;
