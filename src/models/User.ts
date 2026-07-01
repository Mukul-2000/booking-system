import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document { fullName: string; email: string; phone: string; }
const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);