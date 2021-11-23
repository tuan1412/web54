const HttpError = require('../httpError');

const validateInput = (schema, property) => {
  return function (req, res, next) {
    // const input = { ...req.params, ...req.body, ...req.query };
    const input = req[property];

    const { error } = schema.validate(input);
    const valid = !Boolean(error);

    if (valid) { 
      next(); 
    } else {
      const { details } = error;
      
      const message = details.map(i => i.message).join(',');
      throw new HttpError(message, 422)
    } 

  }
}

module.exports = validateInput;