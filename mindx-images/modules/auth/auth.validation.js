const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6)
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6)
});

module.exports = {
  signupSchema,
  loginSchema
}