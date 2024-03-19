const authService = require("../services/auth.service");

class AuthController {
  async login(credentials) {
    try {
      const token = await authService.login(credentials);
      return { token };
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }

  async signUp(userData) {
    try {
      await authService.signUp(userData);
      return { message: "User signed up successfully" };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(userId, newPassword) {
    try {
      await authService.changePassword(userId, newPassword);
      return { message: "Password changed successfully" };
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      await authService.forgotPassword(email);
      return { message: "Password reset instructions sent to your email" };
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userId, updatedData) {
    try {
      await authService.updateProfile(userId, updatedData);
      return { message: "Profile updated successfully" };
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId) {
    try {
      const profile = await authService.getProfile(userId);
      return profile;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthController();
