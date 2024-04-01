const { app } = require("@azure/functions");
const  authTeacher  = require("../../controllers/authTeacher.controller");

// Login endpoint
app.http("login", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "auth/teacher/login",
    handler: authTeacher.login
});

// Login with Apple endpoint
app.http("loginWithApple", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "auth/teacher/loginWithApple",
    handler: authTeacher.loginWithApple
});   

// Sign-Up with Apple endpoint
app.http('signUpWithApple', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'auth/teacher/signupWithApple',
    handler: authTeacher.signupWithApple
});

// Sign-Up endpoint
app.http("signUp", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "auth/teacher/signup",
    handler: authTeacher.signUp
});

// Get profile endpoint
app.http("getProfile", {
    methods: ["GET"],
    authLevel: "anonymous",
    route: "auth/teacher/getProfile",
    handler: authTeacher.getProfile
});

// Change password endpoint
app.http("changePassword", {
    methods: ["POST"],
    authLevel: "anonymous", // Assuming authentication is required to change password
    route: "auth/teacher/changePassword",
    handler: authTeacher.changePassword
});

// Forgot password endpoint
app.http("forgotPassword", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "auth/teacher/forgotPassword",
    handler: authTeacher.forgotPassword
});

// Update profile endpoint
app.http("updateProfile", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "auth/teacher/updateProfile",
    handler: authTeacher.updateProfile
});



