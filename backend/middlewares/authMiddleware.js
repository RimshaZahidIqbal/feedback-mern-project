const jwt = require("jsonwebtoken");
const User = require("../models/Admin");

// Middleware: Protect routes - requires valid JWT
const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1]; // Extract token after 'Bearer'
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user info to the request object (excluding password)
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } else {
            return res.status(401).json({ message: "Not authorized, no token provided" });
        }
    } catch (err) {
        return res.status(401).json({ message: `Token verification failed: ${err.message}` });
    }
};

// Middleware: Allow access to admin users only
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }
};

module.exports = {
    protect,
    adminOnly,
};
