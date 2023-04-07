const jwt =  require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let validToken = "";
    if (token) {
      validToken = token.slice(7);
    }
    if (!token)
      return res.status(401).json({ error: "Access Denied" });
    if (jwt.verify(validToken, process.env.JWT_SECRET)) {
      next();
    } else {
      return res.status(400).json({ error: "Invalid token." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

