const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.MY_SECRET;

const verifyToken = (req, res, next) => {
  console.log(req.headers['authorization'])
  const token = req.headers['authorization'];
  console.log(token)

  if (!token) {
    return res.status(403).send({ message: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
};

module.exports = { verifyToken };
