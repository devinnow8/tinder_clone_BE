const auth = require("./auth.js");

module.exports = async (req, res, next) => {
  try {
    const publicRoutes = "/noAuth"

    if (
      req.originalUrl.startsWith(publicRoutes)
    ) {
      next();
    } else {
      auth(req, res, next);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

