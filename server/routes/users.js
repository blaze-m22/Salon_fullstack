import express from 'express';

import { adminSignIn, adminSignUp } from '../controllers/user.js';
import { userSignIn, userSignUp } from '../controllers/user.js';

const router = express.Router();

router.post('/adminsignin', adminSignIn);
router.post('/adminsignup', adminSignUp);

router.post('/usersignin', userSignIn);
router.post('/usersignup', userSignUp);

export default router;