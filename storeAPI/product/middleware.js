const Joi = require('joi')


const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().integer().required(),
})

const validateProduct = function (req, res, next) {
    const {error, value } = productSchema.validate(req.body)

    if (error) {
        res.status(400).send(error.details);
    }else {
        req.body = value
    }
    next()
}


module.exports = { validateProduct }
