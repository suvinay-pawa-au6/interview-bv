const Joi = require('joi');
const { password } = require('./custom.validation');


const registerUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    age : Joi.number().required().integer().min(10).max(120),
    address : Joi.string().required(),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};


module.exports = {
  registerUser,
  loginUser,
};
