const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Generate JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// @desc  Register a new user 
// @route POST /api/auth/register
// @access Public 


const registerAdmin = async (req, res) => {
    try {
        const { username, password, adminInviteToken } = req.body;

        // Token must match the one in .env
        if (!adminInviteToken || adminInviteToken !== process.env.ADMIN_INVITE_TOKEN) {
            return res.status(403).json({ message: "Invalid or missing admin invite token" });
        }

        // Check if username already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin
        const newAdmin = await Admin.create({
            username,
            password: hashedPassword,
        });

        // Return success with token
        res.status(201).json({
            _id: newAdmin._id,
            username: newAdmin.username,
            token: generateToken(newAdmin._id),
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc  Login admin
// @route POST /api/auth/login
// @access Public
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id),
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
};
