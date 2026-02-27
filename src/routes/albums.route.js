import express from 'express';
import { createEntry } from '../controllers/albumController.js';
import { generateToken } from '../config/generateToken.js';

const router = express.Router();

router.post('/', generateToken, createEntry);



















export default router;