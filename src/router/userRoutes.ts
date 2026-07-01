import { Router } from 'express';
import * as controller from '../controllers/user.controller';
import { userSchema } from '../validations/schema';
import { validate } from '../middleware/validator';

const router = Router();

router.post('/', validate(userSchema), controller.createUser);
router.get('/:id/sessions', controller.getUserSessions);

export default router;