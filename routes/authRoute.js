import express from "express";
import {registerController,loginController,testController,forgotPasswordController,updateProfileController} from '../controllers/authController.js'
import { requireSignIn , isAdmin} from "../middlewares/authMiddleware.js";
///routinh object
const router=express.Router();
//routing
//register|| method post
router.post("/register",registerController)
//login || method post
router.post("/login",loginController)
//forgot password || post
router.post("/forgot-password",forgotPasswordController)
//test || get
router.get("/test",requireSignIn,isAdmin,testController)
//protected route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true} )
})
//update user profile
router.put('/profile',requireSignIn,updateProfileController)

export default router;

