import { Schema, model, Document, Types } from 'mongoose';

export interface ISession extends Document { teacherId: Types.ObjectId; userId?: Types.ObjectId; startTime: Date; endTime: Date; status: 'AVAILABLE' | 'BOOKED' | 'COMPLETED'; completedAt?: Date; }
const sessionSchema = new Schema({
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['AVAILABLE', 'BOOKED', 'COMPLETED'], default: 'AVAILABLE' },
  completedAt: Date
}, { timestamps: true });

export const Session = model<ISession>('Session', sessionSchema);