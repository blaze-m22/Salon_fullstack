import express from 'express';
import { createService, getService, getServices, updateService, deleteService } from '../controllers/services.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', auth, getService);
router.post('/', auth, createService);
router.patch('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);

export default router;