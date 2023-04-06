import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  let secretKey = process.env.jwt_secret_key;
  try {
    const token = req.headers.authorization;
    let validToken = false;
    if (token) {
      validToken = token.slice(7);
    }
    if (!token)
      return res.status(401).json({ error: "Access Denied" });
    if (jwt.verify(validToken, secretKey)) {
      next();
    } else {
      return res.status(400).json({ error: "Invalid token." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
