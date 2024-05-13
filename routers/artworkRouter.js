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

// router.get('/', getAllArtworks);
// router.post('/', createArtwork);

router.route('/').get(getAllArtworks).post(validateArtworkInput, createArtwork);
router
  .route('/:id')
  .get(validateIdParam, getArtwork)
  .patch(validateArtworkInput, updateArtwork)
  .delete(validateIdParam, deleteArtwork);

export default router;
