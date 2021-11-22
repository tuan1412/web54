const HttpError = require('../httpError');

const validateInput = (schema, property) => {
  return function (req, res, next) {
    // const input = { ...req.params, ...req.body, ...req.query };
    const input = req[property];
    console.log(input);

    const result = schema.validate(input);
    console.log(result);
    const valid = !!result.error; 

    if (valid) { 
      next(); 
    } else {
      const { details } = result.error;
      
      const message = details.map(i => i.message).join(',');
      throw new HttpError(message, 422)
    } 

  }
}

module.exports = validateInput;