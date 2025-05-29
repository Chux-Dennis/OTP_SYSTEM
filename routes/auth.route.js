import { Router } from "express";
import { verifyForgotPasswordController } from "../controllers/verifyForgotPassword.controller.js";
import signupController from "../controllers/signup.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { forgotPasswordController } from "../controllers/forgotPassword.controller.js";


const AuthRoutes = Router();


AuthRoutes.post("/signup",signupController)

AuthRoutes.post("/login",loginController)

AuthRoutes.post("/forgot-pass", forgotPasswordController)

AuthRoutes.post("/reset-pass", verifyForgotPasswordController )

export default AuthRoutes;