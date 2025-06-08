import express from 'express';
const router = express.Router();
import { authUser, registerUser } from '../controllers/userController.js';

// For registering a new user, we hit the base '/api/users' route with a POST request
router.route('/').post(registerUser);

// For logging in
router.post('/login', authUser);

export default router;