import { Router } from 'express';
const router = Router();
import {
  getMyArtworks,
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
import { checkForTestUser } from '../middleware/authMiddleware.js';

// router.get('/', getAllArtworks);
// router.post('/', createArtwork);
router.get('/my-artworks', getMyArtworks);
router.get('/all-artworks', getAllArtworks);
router
  .route('/')
  .post(
    checkForTestUser,
    upload.single('avatar'),
    validateArtworkInput,
    createArtwork
  );
router
  .route('/:id')
  .get(validateIdParam, getArtwork)
  .patch(
    checkForTestUser,
    upload.single('avatar'),
    validateArtworkInput,
    updateArtwork
  )
  .delete(checkForTestUser, validateIdParam, deleteArtwork);

export default router;
