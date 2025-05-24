import dotenv from "dotenv"
import { signUpTemplate } from "../mail/signupOtp.template.js"
import nodemailer from "nodemailer"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS
    }
})

const sendOtp = async (email,username, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP to Get Started! 🎉",
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
        html: signUpTemplate(otp,username) 
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log("OTP sent successfully")
    } catch (error) {
        console.error("Error sending OTP:", error)
        throw new Error("Failed to send OTP")
    }
}


export default sendOtp
