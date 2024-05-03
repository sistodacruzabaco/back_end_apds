const Joi = require('joi')

const validateAuth = Joi.object({
    email : Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(15).required(),
})

const validateDonation = Joi.object({
    email : Joi.string().email().lowercase().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    address: Joi.string().required(),
    phone_number: Joi.string().required(), 
    donor_status: Joi.string().uppercase().required(), 
    project_id: Joi.string().required()
})

const authSchema = Joi.object({
    email : Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(15).required(),
    role: Joi.string().uppercase().required()
})

// const validatePartner = Joi.object({
//     partner_name:Joi.string().required(), 
//     email:Joi.string().email().lowercase().required(), 
//     nuit: Joi.string().required(), 
//     address: Joi.string().required(), 
//     logotipo: Joi.string().required(), 
//     project_id: Joi.string().required()
// })

module.exports = {
    validateAuth,
    validateDonation,
    authSchema,
    // validatePartner
}