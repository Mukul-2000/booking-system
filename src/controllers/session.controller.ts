import { Request, Response, NextFunction } from 'express';
import { Session } from '../models/Session';
import mongoose from 'mongoose';
import { Teacher } from '../models/Teacher';
import * as sessionService from '../services/session.service';

// API 3: Available Sessions (Aggregation)
export const getAvailableSessions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timestamp = Number(req.query.dateTimestamp);
        const sessions = await sessionService.getAvailableSessionsByDate(timestamp);
        res.status(200).json(sessions);
    } catch (error) {
        next(error);
    }
};

// API 6: User Session List (Aggregation)
export const getUserSessions = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id }: any = req.params;
        const sessions = await Session.aggregate([
          { $match: { userId: new mongoose.Types.ObjectId(id) } },
          {
            $facet: {
              upcoming: [{ $match: { status: 'BOOKED' } }],
              completed: [{ $match: { status: 'COMPLETED' } }]
            }
          }
        ]);
        res.json(sessions[0]);
    }
    catch(error){
        next(error)
    }
  
};

// API 4: Book Session
export const bookSession = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { userId } = req.body;
        const session = await Session.findById(req.params.id);
        if (!session || session.status !== 'AVAILABLE') return res.status(400).json({ error: 'Invalid Session' });
        
        session.status = 'BOOKED';
        session.userId = userId;
        await session.save();
        res.json(session);
    }
    catch(error){
        next(error)
    }
  
};

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { teacherId, startTime, endTime } = req.body;
  
      // 1. Validate Teacher exists
      const teacherExists = await Teacher.findById(teacherId);
      if (!teacherExists) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      // 2. Validate Time logic
      if (new Date(endTime) <= new Date(startTime)) {
        return res.status(400).json({ message: 'End time must be after start time' });
      }
  
      const newSession = await Session.create({
        teacherId,
        startTime,
        endTime,
        status: 'AVAILABLE'
      });
  
      res.status(201).json(newSession);
    } catch (error) {
      next(error);
    }
  };


  export const completeSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
  
      // 1. Session must exist
      const session = await Session.findById(id);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
  
      // 2. Only BOOKED sessions can be marked as completed
      if (session.status !== 'BOOKED') {
        return res.status(400).json({ message: 'Only BOOKED sessions can be completed' });
      }
  
      // 3. Update status
      session.status = 'COMPLETED';
      session.completedAt = new Date();
      await session.save();
  
      res.status(200).json(session);
    } catch (error) {
      next(error);
    }
  };