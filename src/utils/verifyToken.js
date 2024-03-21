const jwt = require("jsonwebtoken");
const Authenticate = async (request) => {
  try {
    const token = await request.headers.get("authorization");
    // console.log("-------------", token);
    if (!token) {
      return {
        status: 401,
        message: "Unauthorized",
      };
    }
    const jwtToken = token.split(" ")[1];

    const decodeToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log("------------------------");
    console.log(decodeToken);

    // if (!decodeToken) {
    //   throw new Error("User not found");
    // }
    return {
      status: 200,
      message: "User authenticated",
      userEmail,
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
