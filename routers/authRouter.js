import { Router } from 'express';
const router = Router();
import { login, logout, register } from '../controllers/authController.js';
import {
  validateUserInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';

router.post('/register', validateUserInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

export default router;
