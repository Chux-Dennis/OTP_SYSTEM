import User from "../models/User.model.js"
import forgotPasswordOtp from "../services/forgotPasswordOtp.js";
import { Op } from "sequelize";
import generateOtp from "../utils/generateOtp.js";
import { forgotPasswordValidator } from "../validation/auth.validator.js";

const otpDuration = 10

export const forgotPasswordController = async (req, res) => {
    
    const { email, username } = req.body
    
    const { error } = forgotPasswordValidator.validate(req.body)

    // Validating Payload
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        // Check if user exists by email or username
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                ]
            }
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Generate OTP
        const otp = generateOtp();
        const otpExpires = new Date(Date.now() + otpDuration * 60 * 1000) //10 minutes


        //Update the user with OTP and expiration time
        user.otp = otp;
        user.otpExpires = otpExpires

        await user.save();

        // Send OTP to user's email
        await forgotPasswordOtp( user.email,otp)


        return res.status(200).send({ message: "OTP sent to user" });

    } catch (error) {
        console.error("an error occurred:", error);
        return res.status(500).send({ message: "Server error" });
    }
}