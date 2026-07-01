import { Session } from '../models/Session';
import { Types } from 'mongoose';

export const getAvailableSessionsByDate = async (timestamp: number) => {
  const date = new Date(timestamp);
  const start = new Date(date.setHours(0, 0, 0, 0));
  const end = new Date(date.setHours(23, 59, 59, 999));

  return await Session.aggregate([
    { $match: { status: 'AVAILABLE', startTime: { $gte: start, $lte: end } } }
  ]);
};