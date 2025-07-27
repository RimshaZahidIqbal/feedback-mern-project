const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/authController");

const router = express.Router();

// Register route
router.post("/register", registerAdmin);

// Login route
router.post("/login", loginAdmin);

module.exports = router;
