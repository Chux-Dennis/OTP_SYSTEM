import Joi from "joi";

export const signupValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(15),
    username: Joi.string().required().trim().min(5).max(25)
})

export const loginValidator = Joi.object({
    username: Joi.string(),
    email:Joi.string().email(),
    password:Joi.string().required(),
    otp: Joi.number()
})

export const forgotPasswordValidator = Joi.object({
    username:Joi.string().optional(),
    email:Joi.string().email().optional(),
}).xor('username', 'email').required().messages({
    'object.xor': 'Either username or email must be provided, but not both.'
});

export const verifyForgotPasswordValidator = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.number().required(),
    password: Joi.string().required().min(8).max(15)
})