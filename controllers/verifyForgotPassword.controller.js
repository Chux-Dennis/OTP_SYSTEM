import User from "../models/User.model.js";
import bcrypt from "bcrypt"
import { verifyForgotPasswordValidator } from "../validation/auth.validator.js";
export const verifyForgotPasswordController = async (req, res) => {
    const { email,otp, password } = req.body

    const {error} = verifyForgotPasswordValidator.validate(req.body)

    if (error) {
        res.status(400).send({ message: error.details[0].message }) 
    }
   
    try {
        // Check if user exists by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Verify OTP
        if (user.otp !== otp) {
            return res.status(400).send({ message: "Invalid OTP" });
        }

        // Check if otp is expired

        if (user.otpExpires < new Date()) {
            return res.status(400).send({ message: "OTP has expired" });
        }

        console.log(otp);
        console.log(user.otp);
        console.log(user.otpEExpires);

        const hashedPassword = bcrypt.hash(password,10)

        // Update password
        user.password = hashedPassword;
        user.otp = null; // Clear OTP after successful verification
        user.otpExpires = null; // Clear OTP expiration

        await user.save();

        res.status(200).send({ message: "Password updated successfully" });

    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ message: "Server error" });
    }
}