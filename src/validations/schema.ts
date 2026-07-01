import Joi from 'joi';

export const userSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const sessionCreateSchema = Joi.object({
  teacherId: Joi.string().hex().length(24).required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
});

export const bookSessionSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
});

export const teacherSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    specialization: Joi.string().required(),
    experience: Joi.number().integer().min(0).required(),
  });