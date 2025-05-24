import Joi from "joi";

const signupValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(15),
    username: Joi.string().required().trim().min(5).max(25)
})

export default signupValidator