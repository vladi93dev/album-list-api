import express from 'express';
import { register, login, logout, me } from '../controllers/authController.js';
import requestValidator from '../middlewares/requestValidator.js';
import { loginSchema, registerSchema } from '../validators/authSchemas.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', requestValidator(registerSchema), register);

router.post('/login',requestValidator(loginSchema) , login);

router.get('/me', authMiddleware, me);

router.post('/logout', logout);


export default router;