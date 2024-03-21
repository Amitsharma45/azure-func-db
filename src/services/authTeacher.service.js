const db = require("../config/db.config");
// connect to db
const connection = db.getConnection();

const signUp = async (body) => {
  try {
    const data = await connection.users.create(body);
    return data;
  } catch (error) {
    console.log("------get user by id error", error.message);
    throw new Error(error);
  }
};

const getUserById = async (id) => {
  try {
   
    const data = await connection.users.findOne({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    
    throw new Error(error);
  }
};

const updateProfile = async (body) => {
  try {
   
    const data = await connection.users.update(body, {
      where: {
        id: body.id,
      },
    });
    return "User profile updated successfully";
  } catch (error) {
    throw new Error(error);
  }
};

const changePassword = async (body) => {
  try {
    const data = await connection.users.update(body, {
      where: {
        id: body.id,
      },
    });
    return "User password changed successfully";
  } catch (error) {
    console.log("------change password error", error);
    throw new Error(error);
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
  getUserById,
  updateProfile,
  changePassword
};
