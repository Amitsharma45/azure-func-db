const authService = require("../services/authTeacher.service");

const signUp = async (request, context) => {
  try {
    
    const body = await request.json();
    const { firstName, lastName, email, password } = body;
    
    if (!firstName || !lastName || !email || !password) {
      return (context.res = {
        status: 400,
        body: "Please send all required fields",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // creating a new user
    const user = await authService.signUp(body);
    
    return (context.res = {
      status: 200,
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return (context.res = {
      status: 500,
      body: "Internal Server Error",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

const login = async (request, context) => {
  context.log("HTTP function processed request for login", request.body);
  try {
    // convert the request body to JSON
    const { body } = request.json();
    const token = await authService.login(body);
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

const changePassword = async (request, context) => {
  context.log(
    "HTTP function processed request for change password",
    request.body
  );

  return {
    body: {
      message: "Password changed successfully",
    },
  };
};

const forgotPassword = async (request, context) => {
  context.log(
    "HTTP function processed request for forgot password",
    request.body
  );

  return {
    body: {
      message: "Password reset instructions sent to your email",
    },
  };
};

const updateProfile = async (request, context) => {
  context.log(
    "HTTP function processed request for update profile",
    request.body
  );

  return {
    body: {
      message: "Profile updated successfully",
    },
  };
};

const getProfile = async (request, context) => {
  context.log("HTTP function processed request for get profile", request.body);

  return {
    body: {
      profile: "profile",
    },
  };
};

module.exports = {
  login,
  signUp,
  changePassword,
  forgotPassword,
  updateProfile,
  getProfile,
};
