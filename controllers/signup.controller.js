import bcrypt from "bcrypt"
import sendOtp from "../services/sendOtp.js"
import User from "../models/User.model.js"
import signupValidator from "../validation/signup.validator.js"
import { Op } from "sequelize"
import generateOtp from "../utils/generateOtp.js"

const signupController = async (req, res) => {

    const { password, email, username } = req.body

    const { error } = signupValidator.validate(req.body)

    // Validating Payload 
    if (error) {
        res.status(400).send({ message: error.details[0].message })
        return
    }

    // Checking if User exists
    try {
        const existingUserName = await User.findOne({ where: { username } })
        const existingEmail = await User.findOne({ where: { email } })

        if (existingUserName) {
            return res.status(400).send({ message: "Username already exist" })
        }
        if (existingEmail) {
            return res.status(400).send({ message: "Email already exist" })
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Generate OTP 
        const otp = generateOtp()
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000) //10 minutes


        //Create User with payload provided
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            otp,
            otpExpires
        })

        //Send OTP
        await sendOtp(email, username, otp)

        res.status(201).send({ message: "OTP sent to user" })


    } catch (error) {
        res.status(500).send({ message: "Server error" })

    }

}

export default signupController