import { Router } from 'express';
const router = Router();

import {
  getAllArtworks,
  getArtwork,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} from '../controllers/artworkControllers.js';
import {
  validateIdParam,
  validateArtworkInput,
} from '../middleware/validationMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

// router.get('/', getAllArtworks);
// router.post('/', createArtwork);

router
  .route('/')
  .get(getAllArtworks)
  .post(upload.single('avatar'), validateArtworkInput, createArtwork);
router
  .route('/:id')
  .get(validateIdParam, getArtwork)
  .patch(upload.single('avatar'), validateArtworkInput, updateArtwork)
  .delete(validateIdParam, deleteArtwork);

export default router;
