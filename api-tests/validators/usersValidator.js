const Joi = require('frisby').Joi;

const userListValidator = {
  dataArray: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      email: Joi.string().email().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      avatar: Joi.string().uri().required()
    })
  )
};

module.exports = { userListValidator };
