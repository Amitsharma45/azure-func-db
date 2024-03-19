const { app } = require("@azure/functions");
const authController = require("../controllers/auth.controller");

// Login endpoint
app.http("login", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log("HTTP function processed request for login", request.body);

    const credentials = request.body;
    const token = await authController.login(credentials);

    return {
      body: {
        token,
      },
    };
  },
});

// Sign-Up endpoint
app.http("signUp", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log("HTTP function processed request for sign-up", request.body);

    const userData = request.body;
    await authController.signUp(userData);

    return {
      body: {
        message: "User signed up successfully",
      },
    };
  },
});

// Change password endpoint
app.http("changePassword", {
  methods: ["POST"],
  authLevel: "function", // Assuming authentication is required to change password
  handler: async (request, context) => {
    context.log(
      "HTTP function processed request for change password",
      request.body
    );

    const { userId, newPassword } = request.body;
    await authController.changePassword(userId, newPassword);

    return {
      body: {
        message: "Password changed successfully",
      },
    };
  },
});

// Forgot password endpoint
app.http("forgotPassword", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(
      "HTTP function processed request for forgot password",
      request.body
    );

    const email = request.body.email;
    await authController.forgotPassword(email);

    return {
      body: {
        message: "Password reset instructions sent to your email",
      },
    };
  },
});

// Update profile endpoint
app.http("updateProfile", {
  methods: ["POST"],
  authLevel: "function", // Assuming authentication is required to update profile
  handler: async (request, context) => {
    context.log(
      "HTTP function processed request for update profile",
      request.body
    );

    const { userId, updatedData } = request.body;
    await authController.updateProfile(userId, updatedData);

    return {
      body: {
        message: "Profile updated successfully",
      },
    };
  },
});

// Get profile endpoint
app.http("getProfile", {
  methods: ["GET"],
  authLevel: "function", // Assuming authentication is required to get profile
  handler: async (request, context) => {
    context.log(
      "HTTP function processed request for get profile",
      request.body
    );

    const userId = request.query.userId;
    const profile = await authController.getProfile(userId);

    return {
      body: profile,
    };
  },
});
