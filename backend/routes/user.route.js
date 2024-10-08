const express = require('express');
const {registerUser, authUser, updateUserProfile} = require("../controllers/user.controller.js");
const {protect} = require("../middlewares/auth.middleware.js")
const router = express.Router()

router.route('/').post(registerUser);
router.route("/login").post(authUser);
router.route('/profile').post(protect, updateUserProfile);

module.exports = router;