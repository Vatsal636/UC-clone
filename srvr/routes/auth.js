const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateProfile } = require("../controllers/authController");
const { auth } = require("../middleware/authMiddleware");

// @route   POST /api/auth/register
// @desc    Register a new user
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post("/login", loginUser);

// @route   PUT /api/auth/profile
// @desc    Update user profile
router.put("/profile", auth, updateProfile);

module.exports = router;
