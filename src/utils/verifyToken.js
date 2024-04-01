const jwt = require("jsonwebtoken");
const Authenticate = async (request) => {
  try {
    const token = await request.headers.get("authorization");
    if (!token) {
      return {
        status: 401,
        message: "Unauthorized",
      };
    }
    const jwtToken = token.split(" ")[1];

    const decodeUser = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    if (!decodeUser) {
      throw new Error("User not found");
    }

    return {
      status: 200,
      message: "User authenticated",
      decodeUser,
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        status: "401",
        message: "Token expired",
      };
    } else {
      return {
        status: "401",
        message: "Invalid token",
      };
    }
  }
};

module.exports = { Authenticate };
