import bcrypt from "bcrypt"
import { loginValidator } from "../validation/auth.validator.js";
import User from "../models/User.model.js";
import sendOtp from "../services/sendOtp.js";
import jwt from "jsonwebtoken"

const lastLoginDuration = 15
const newOtpDuration = 10

export const loginController = async (req, res) => {
    
    const { email, password, otp } = req.body;
    const { error } = loginValidator.validate(req.body)
    
    if(error){
        res.status(400).send({ message: error.details[0].message })
        return
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check verification status and last login
        const fifteenDaysAgo = new Date(Date.now() - lastLoginDuration * 24 * 60 * 60 * 1000);
        if (!user.isVerified || (user.lastLogin && user.lastLogin < fifteenDaysAgo)) {
            if (!otp) {
                // Generate and send new OTP
                const newOtp = generateOTP();
                const otpExpires = new Date(Date.now() + otpDuration * 60 * 1000);
                user.otp = newOtp;
                user.otpExpires = otpExpires;
                await user.save();

                await sendOtp(email, user.username, newOtp);
                return res.status(403).json({ error: 'OTP required. Sent to your email.' });
            }

            // Verify provided OTP
            if (user.otp !== otp || user.otpExpires < new Date()) {
                return res.status(400).json({ error: 'Invalid or expired OTP' });
            }

            // OTP is valid, clear it
            user.isVerified = true;
            user.otp = null;
            user.otpExpires = null;
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: 'Server error' });
    }
}