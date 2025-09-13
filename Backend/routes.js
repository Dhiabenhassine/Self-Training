const express = require("express");
const router = express.Router();
const authController = require("./controllers/authentication");
const packageController = require ('./controllers/packagesController')

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
    router.post("/insertPackage", async(req,res)=>{
        try{
            await packageController.insertPackage(req,res)
        }catch(err){
            console.error('error from router insert package')
            res.status(500).json({message: "internal server error"})
        }
    })
   router.get("/allPackages", async(req,res)=>{
        try{
            await packageController.selectPackages(req,res)
        }catch(err){
            console.error('error from router select package')
            res.status(500).json({message: "internal server error"})
        }
    })
      router.post("/selectPackageById", async(req,res)=>{
        try{
            await packageController.selectPackageById(req,res)
        }catch(err){
            console.error('error from router select package')
            res.status(500).json({message: "internal server error"})
        }
    })
      router.post("/updatePackage", async(req,res)=>{
        try{
            await packageController.updatePackage(req,res)
        }catch(err){
            console.error('error from router select package')
            res.status(500).json({message: "internal server error"})
        }
    })
return router
}