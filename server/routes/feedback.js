import express from 'express';
import auth from '../middleware/auth.js';
import { createGalleryItem, deleteGalleryItem, getGallery } from '../controllers/feedback.js';

const router = express.Router();

router.get('', getGallery);
router.post('', auth, createGalleryItem);
router.delete('/:id', auth, deleteGalleryItem);

export default router;