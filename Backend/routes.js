const express = require("express");
const router = express.Router();
const authController = require("./controllers/authentication");

module.exports = () => {
    router.post("/register", async (req, res) => {
        try {
            await authController.register(req, res);
        } catch (error) {
            console.error("Error in registration route:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    router.post("/login", async (req, res) => {
        try {
            await authController.login(req, res);
        } catch (error) {
            console.error("Error in login route:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    router.post("/forgot-password", async (req, res) => {
        try {
            await authController.PasswordReinitialisation(req, res);
        } catch (error) {
            console.error("Error in forgot password route:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    router.post("/UpdatePassword", async (req, res) => {
        try {
            await authController.UpdatePassword(req, res);
        } catch (error) {
            console.error("Error in reset password route:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    router.post("/PasswordReinitialisationTokenCheck", async (req, res) => {
        try {
            await authController.PasswordReinitialisationTokenCheck(req, res);
        } catch (error) {
            console.error("Error in password reinitialisation token check route:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });


return router
}