import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { Session } from '../models/Session';
import mongoose from 'mongoose';

// API 1: Create User
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, email, phone } = req.body;
    
    // Mongoose unique index will handle the duplicate email error
    const newUser = await User.create({ fullName, email, phone });
    
    res.status(201).json(newUser);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    next(error);
  }
};

// API 6: User Session List (Mandatory Aggregation Pipeline)
export const getUserSessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id }: any = req.params;

    const result = await Session.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(id) } },
      {
        $facet: {
          upcomingSessions: [
            { $match: { status: 'BOOKED' } },
            { $sort: { startTime: 1 } }
          ],
          completedSessions: [
            { $match: { status: 'COMPLETED' } },
            { $sort: { completedAt: -1 } }
          ]
        }
      }
    ]);

    res.status(200).json(result[0] || { upcomingSessions: [], completedSessions: [] });
  } catch (error) {
    next(error);
  }
};