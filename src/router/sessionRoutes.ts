import { Router } from 'express';
import * as controller from '../controllers/session.controller';
import { validate } from '../middleware/validator';
import { bookSessionSchema, sessionCreateSchema } from '../validations/schema';

const router = Router();

router.post('/', validate(sessionCreateSchema), controller.createSession);
router.get('/available', validate(bookSessionSchema), controller.getAvailableSessions);
router.post('/:id/book', controller.bookSession);
router.patch('/:id/complete', controller.completeSession);

export default router;