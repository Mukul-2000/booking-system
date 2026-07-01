import { Router } from 'express';
import * as controller from '../controllers/teacher.controller';
import { validate } from '../middleware/validator';
import { teacherSchema } from '../validations/schema';

const router = Router();

// Endpoint to create a teacher
router.post('/', validate(teacherSchema), controller.createTeacher);

export default router;