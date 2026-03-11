import express from 'express';
import { register, login } from '../controllers/authController.js';
import requestValidator from '../middlewares/requestValidator.js';
import { loginSchema, registerSchema } from '../validators/authSchemas.js';

const router = express.Router();

router.post('/register', requestValidator(registerSchema), register);

router.post('/login',requestValidator(loginSchema) , login);


export default router;