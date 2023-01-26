const Joi = require('joi');
const httpStatus = require('http-status');
const select = require('../utils/select');

// Standard Joi Validation 
const validate = (schema) => (req, res, next) => {
  const validSchema = select(schema, ['params', 'query', 'body']);
  const object = select(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(httpStatus.BAD_REQUEST).json({success : false , error : errorMessage});
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
