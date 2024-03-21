const authService = require("../services/authTeacher.service");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/generateToken");

// Sign-Up controller to create a new user
const signUp = async (request, context) => {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, accessLevel } = body;

    if (!firstName || !lastName || !email || !password || !accessLevel) {
      return (context.res = {
        status: 400,
        body: JSON.stringify({
          message: "Please send all required fields",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // hash the password
    const salt = bcrypt.genSaltSync(6);
    const hashPassword = bcrypt.hashSync(password, salt);
    body.password = hashPassword;

    // creating a new user
    const user = await authService.signUp(body);

    return (context.res = {
      status: 200,
      body: JSON.stringify({
        message: "User created successfully",
        user: user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return (context.res = {
      status: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// Get profile controller to get user profile
const getProfile = async (request, context) => {
  try {
    const { id } = request.params;
    console.log("------id----", id);
    if (!id) {
      return (context.res = {
        status: 400,
        body: "user id required",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // get user by id
    const user = await authService.getUserById(id);

    // check if user exists
    if (!user) {
      return (context.res = {
        status: 404,
        body: JSON.stringify({ message: "User not found" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return (context.res = {
      status: 200,
      body: JSON.stringify({
        message: "User profile retrieved successfully",
        user: user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return (context.res = {
      status: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

const login = async (request, context) => {
  try {
    // convert the request body to JSON
    const body = await request.json();
    const { email, password } = body;
    console.log("------body----", body);

    if (!email || !password) {
      return (context.res = {
        status: 400,
        body: JSON.stringify({
          message: "Please send all required fields",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // const token = await authService.login(body);
    const jwtToken = generateAccessToken(email);

    return (context.res = {
      status: 200,
      body: JSON.stringify({
        message: "User logged in successfully",
        token: jwtToken,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        "Set-Cookie": `jwtToken=${jwtToken}`,
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

const changePassword = async (request, context) => {
  try {
    const body = await request.json();
    const { id, oldPassword, newPassword } = body;

    if (!id || !oldPassword || !newPassword) {
      return (context.res = {
        status: 400,
        body: JSON.stringify({
          message: "Please send all required fields",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const user = await authService.getUserById(id);

    if (!user) {
      return (context.res = {
        status: 404,
        body: JSON.stringify({
          message: "User not found",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // check user old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return (context.res = {
        status: 400,
        body: JSON.stringify({
          message: "Old password is incorrect",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // hash the password
    const salt = bcrypt.genSaltSync(6);
    const hashPassword = bcrypt.hashSync(newPassword, salt);

    await authService.changePassword({ id, password: hashPassword });

    return (context.res = {
      status: 200,
      body: JSON.stringify({
        message: "Password updated successfully",
        user: user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return (context.res = {
      status: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
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

// Update profile controller to update user profile
const updateProfile = async (request, context) => {
  try {
    const body = await request.json();
    const { id, firstName, lastName, email } = body;

    if (
      !id ||
      !firstName ||
      !lastName ||
      !email
    ) {
      return (context.res = {
        status: 400,
        body: JSON.stringify({
          message: "Please send all required fields",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // check if user exists
    const user = await authService.getUserById(id);

    if (!user) {
      return (context.res = {
        status: 404,
        body: "User not found",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // update user profile
    const updatedUser = await authService.updateProfile(body);

    return (context.res = {
      status: 200,
      body: JSON.stringify({
        message: "User profile updated successfully",
      }),
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

module.exports = {
  login,
  signUp,
  changePassword,
  forgotPassword,
  updateProfile,
  getProfile,
};
