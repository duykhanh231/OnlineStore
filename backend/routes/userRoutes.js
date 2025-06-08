import express from 'express';
const router = express.Router();
import { authUser, registerUser } from '../controllers/userController.js';

router.post('/login', authUser);
router.post('/', registerUser); // This handles registration at POST /api/users

export default router;