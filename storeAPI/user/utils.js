const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).required()
})

function generateKey(username) {
    const firstThreeLetters = username.slice(0, 3).toUpperCase();
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
  
    return `${firstThreeLetters}${randomNumber}`;
  }

module.exports = { userSchema, generateKey }