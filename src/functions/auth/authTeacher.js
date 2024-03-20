const { app } = require("@azure/functions");
const  authTeacher  = require("../../controllers/authTeacher.controller");

// Login endpoint
app.http("loginTeacher", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "auth/teacher/login",
    handler: authTeacher.login
});

// Sign-Up endpoint
app.http("signUpTeacher", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "auth/teacher/signup",
    handler: authTeacher.signUp
});

// Change password endpoint
app.http("changePasswordTeacher", {
    methods: ["POST"],
    authLevel: "function", // Assuming authentication is required to change password
    route: "auth/teacher/changePassword",
    handler: authTeacher.changePassword
});

// Forgot password endpoint
app.http("forgotPasswordTeacher", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "auth/teacher/forgotPassword",
    handler: authTeacher.forgotPassword
});

// Update profile endpoint
app.http("updateProfileTeacher", {
    methods: ["POST"],
    authLevel: "function",
    route: "auth/teacher/updateProfile",
    handler: authTeacher.updateProfile
});

// Get profile endpoint
app.http("getProfileTeacher", {
    methods: ["GET"],
    authLevel: "function",
    route: "auth/teacher/getProfile",
    handler: authTeacher.getProfile
});

