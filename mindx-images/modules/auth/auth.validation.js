const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  signupSchema,
  loginSchema
}