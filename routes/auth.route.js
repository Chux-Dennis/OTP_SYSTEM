import { Router } from "express";
import signupController from "../controllers/signup.controller.js";

const AuthRoutes = Router();


AuthRoutes.post("/signup",signupController)

export default AuthRoutes;