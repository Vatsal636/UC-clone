const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register Controller
const registerUser = async (req, res) => {
    const { name, phone, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({ name, phone, email, password });
        await newUser.save();

        // Create token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({ token, user: { name: newUser.name, phone: newUser.phone, email: newUser.email, _id: newUser._id } });
    } catch (err) {
        console.error("Registration error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Login Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({ token, user: { name: user.name, phone: user.phone, email: user.email, _id: user._id } });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Profile Controller
const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, phone } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name || user.name;
        user.phone = phone || user.phone;
        await user.save();
        res.status(200).json({ user: { name: user.name, phone: user.phone, email: user.email, _id: user._id } });
    } catch (err) {
        console.error("Update profile error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser, loginUser, updateProfile };
