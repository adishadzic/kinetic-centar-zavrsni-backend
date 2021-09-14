const Joi = require('joi');

const clienEmailValidation = (data) => {
  const schema = Joi.object({
    client_first_name: Joi.string().required(),
    client_last_name: Joi.string().required(),
    client_email: Joi.string().required().email(),
    client_phone_number: Joi.string().max(15).required(),
    client_birth_date: Joi.string().required(),
    client_sex: Joi.string().min(1).max(1).required(),
  });
  return schema.validate(data);
};

module.exports = { clienEmailValidation };
