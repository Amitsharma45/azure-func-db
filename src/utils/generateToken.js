const jwt = require("jsonwebtoken");

function generateAccessToken(email) {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = "7d";
  const token = jwt.sign({ email }, jwtSecretKey, { expiresIn });
  return token;
}

module.exports = { generateAccessToken };