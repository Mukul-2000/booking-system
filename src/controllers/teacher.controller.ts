import { Request, Response, NextFunction } from 'express';
import { Teacher } from '../models/Teacher';

export const createTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, email, specialization, experience } = req.body;

    const newTeacher = await Teacher.create({
      fullName,
      email,
      specialization,
      experience
    });

    res.status(201).json(newTeacher);
  } catch (error) {
    next(error);
  }
};