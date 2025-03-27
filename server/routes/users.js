import express from 'express';

import { adminSignIn, adminSignUp, updateUserProfile, userSignIn, userSignUp } from '../controllers/user.js';
import auth from '../middleware/auth.js';
import { addToFavorites } from '../controllers/services.js';

const router = express.Router();

router.post('/adminsignin', adminSignIn);
router.post('/adminsignup', adminSignUp);

router.post('/usersignin', userSignIn);
router.post('/usersignup', userSignUp);

router.patch('/:id', auth, updateUserProfile);
router.patch('/:id/addToFavorites', auth, addToFavorites);

export default router;