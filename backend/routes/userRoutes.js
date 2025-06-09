import express from 'express';
const router = express.Router();
import { authUser, registerUser } from '../controllers/userController.js';

// For registering a new user
router.route('/').post(registerUser);

// For authenticating (logging in) a user
router.post('/login', authUser);

export default router;