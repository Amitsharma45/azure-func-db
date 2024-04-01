const authService = require("../services/authTeacher.service");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/generateToken");
const { Authenticate } = require("../utils/verifyToken");

// Sign-Up controller to create a new user
const signUp = async (request, context) => {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, accessLevel, birthYear } =
      body;

    const userExist = await authService.getUserByEmail(email);

    if (userExist) {
      return (context.res = {
        status: 400,
        jsonBody: {
          status: 400,
          message: `User already exists with this email address ${email}`,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !accessLevel ||
      !birthYear
    ) {
      return (context.res = {
        status: 400,
        jsonBody: {
          status: 400,
          message: "Please send all required fields",
        },
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
        status: 200,
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
        status: 500,
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
    const data = await Authenticate(request);
    if (data.status !== 200) {
      return (context.res = {
        status: 401,
        jsonBody: {
          status: 401,
          message: "Unauthorized access ",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    // get user by id
    const { decodeUser } = data;
    const user = await authService.getUserByEmail(decodeUser.email);

    // check if user exists
    if (!user) {
      return (context.res = {
        status: 404,
        jsonBody: {
          status: 404,
          message: "User not found",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return (context.res = {
      status: 200,
      jsonBody: {
        status: 200,
        message: "User profile retrieved successfully",
        user: user,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return (context.res = {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// Login controller to authenticate user
const login = async (request, context) => {
  try {
    // convert the request body to JSON
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return (context.res = {
        status: 400,
        body: JSON.stringify({
          status: 400,
          message: "Please send all required fields",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    // check if user exists

    const userExist = await authService.getUserByEmail(email);
    if (!userExist) {
      return (context.res = {
        status: 400,
        body: JSON.stringify({
          status: 400,
          message: "User does not exist",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    // check user  password
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return (context.res = {
        status: 400,
        jsonBody: {
          status: 400,
          message: "Invalid password",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const jwtToken = generateAccessToken(email);

    return (context.res = {
      status: 200,
      body: JSON.stringify({
        status: 200,
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
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// Change password controller to update user password
const changePassword = async (request, context) => {
  try {
    const body = await request.json();
    const { id, oldPassword, newPassword } = body;

    if (!id || !oldPassword || !newPassword) {
      return (context.res = {
        status: 400,
        jsonBody: {
          status: 400,
          message: "Please send all required fields",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const user = await authService.getUserById(id);

    if (!user) {
      return (context.res = {
        status: 404,
        jsonBody: {
          status: 404,
          message: "User not found",
        },
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
        jsonBody: {
          status: 400,
          message: "Old password is incorrect",
        },
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
      jsonBody: {
        status: 200,
        message: "Password updated successfully",
        user: user,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return (context.res = {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// Forgot password controller to send password reset instructions
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
    const { id } = body;

    if (!id) {
      return (context.res = {
        status: 400,
        jsonBody: {
          status: 400,
          message: "Please send all required fields",
        },
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
        jsonBody: {
          status: 404,
          message: "User not found",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // update user profile
    const updatedUser = await authService.updateProfile(body);

    return (context.res = {
      status: 200,
      jsonBody: {
        status: 200,
        message: "User profile updated successfully",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return (context.res = {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
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
