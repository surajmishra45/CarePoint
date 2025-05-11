import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    // Extract token from header
    const dtoken = req.headers.authorization?.split(" ")[1] || req.headers.token;

    if (!dtoken) {
      console.warn("🚨 No token found in headers!");
      return res.status(401).json({ success: false, message: "❌ No token provided." });
    }

    console.log("🔑 Extracted Tokenn:", dtoken);

    // Verify token
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    console.log("✅ Decoded Tokenn:", decoded);

    // Check if the user has a doctor role
    // if (decoded.role !== "doctor") {
    //   return res.status(403).json({ success: false, message: "❌ Access denied. Not a doctor." });
    // }

    // Attach user ID to request body
    req.body.docId = decoded.id;

    next(); // Allow request to proceed
  } catch (error) {
    console.error("❌ Authenticationn Error:", error.message);

    // Check for JWT expiration
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "❌ Token expired. Please log in again." });
    }

    res.status(401).json({ success: false, message: "❌ Invalid token." });
  }
};

export default authDoctor;
