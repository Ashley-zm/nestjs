import Joi = require('joi');
export const creatUserSchema = Joi.object({
  loginName: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().required(),
  sex: Joi.number(),
  email: Joi.string(),
  address: Joi.string(),
});
