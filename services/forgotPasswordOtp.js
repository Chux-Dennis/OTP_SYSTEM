import dotenv from "dotenv"
import { forgotPasswordOtpTemplate } from "../mail/forgotPasswordOtp.template.js"
import nodemailer from "nodemailer"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS
    }
})

const forgotPasswordOtp = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "We can't let you forget your password! 🔐",
        html: forgotPasswordOtpTemplate(otp)
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log("OTP sent successfully")
    } catch (error) {
        console.error("Error sending OTP:", error)
        throw new Error("Failed to send OTP")
    }
}


export default forgotPasswordOtp
