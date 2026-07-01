import { Schema, model, Document } from 'mongoose';

export interface ITeacher extends Document { fullName: string; email: string; specialization: string; experience: number; }
const teacherSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  specialization: String,
  experience: Number
}, { timestamps: true });

export const Teacher = model<ITeacher>('Teacher', teacherSchema);