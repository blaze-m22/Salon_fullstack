import express from 'express';
import { createService, getServices } from '../controllers/services.js';

const router = express.Router();

router.get('/', getServices);
router.post('/', createService);

export default router;