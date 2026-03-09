import express from 'express';
import { createEntry } from '../controllers/albumController.js';
import { generateToken } from '../config/generateToken.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import requestValidator from '../middlewares/requestValidator.js';
import createEntrySchema from '../validators/createEntrySchema.js';


const router = express.Router();


router.use(authMiddleware);

router.post('/', requestValidator(createEntrySchema), createEntry);

















export default router;