import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        // Extract token from header
        const token = req.headers.authorization?.split(" ")[1] || req.headers.token;
        
        if (!token) {
            console.warn("🚨 No token found in headers!");
            return res.status(401).json({ success: false, message: "❌ No token provided." });
        }

        console.log("🔑 Extracted Token:", token);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        // Check if it's an admin
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            console.warn("🚫 Unauthorized access attempt by:", decoded.email);
            return res.status(403).json({ success: false, message: "🚫 Unauthorized: Admin access required." });
        }

        req.admin = decoded; // Store decoded data for later use
        next(); // Allow request to proceed

    } catch (error) {
        console.error("❌ Authentication Error:", error.message);

        // Check for JWT expiration
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "❌ Token expired. Please log in again." });
        }

        res.status(401).json({ success: false, message: "❌ Invalid token." });
    }
};

export default authAdmin;
