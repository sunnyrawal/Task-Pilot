const jwt = require("jsonwebtoken");

async function protect(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // 🔐 verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 📌 attach user to request
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports ={
    protect
}
