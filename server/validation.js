// VALIDATION DATA
const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
        permission: Joi.string().min(5).max(7).required()
    })

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })

    return schema.validate(data)
}

const classValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required()
    });

    return schema.validate(data)
}

const examValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        start: Joi.date().required(),
        classId: Joi.string().min(6).max(1024),
        limit: Joi.number().min(0).required()
    })

    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.classValidation = classValidation
module.exports.examValidation = examValidation
