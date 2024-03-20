const db = require("../config/db.config");

const signUp = async (body) => {
  try {
    // connect to db
    const connection = db.getConnection();
    const data = await connection.users.create(body);
    return data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

const login = async (request, context) => {
  context.log("HTTP function processed request for login", request.body);
  try {
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

module.exports = {
  login,
  signUp,
};
