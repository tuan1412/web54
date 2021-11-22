const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('').allow(null),
  imageUrl: Joi.string().pattern(new RegExp('^http.*$')).required(),
  likeCount: Joi.number().allow(null),
  tags: Joi.array().allow(null),
});

module.exports = {
  createPostSchema
}