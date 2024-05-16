import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import { ARTWORK_STATUS, ARTWORK_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Artwork from '../models/ArtworkModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      // console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith('no')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not')) {
          throw new UnauthenticatedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateArtworkInput = withValidationErrors([
  body('title').notEmpty().withMessage('title is required'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 200 })
    .withMessage('Description is too long'),
  body('location').notEmpty().withMessage('location is required'),
  body('price').notEmpty().withMessage('price is required'),
]);
export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
    const artwork = await Artwork.findById(value);
    if (!artwork) throw new NotFoundError(`no artwork with id ${value}`);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === artwork.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw UnauthorizedError('not authorized to access this route');
  }),
]);

export const validateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required').trim(),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('that is not an email')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists ');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .trim()
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 character'),
  body('lastName').notEmpty().withMessage('lastName is required'),
  body('location').notEmpty().withMessage('location is required').trim(),
]);
export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('that is not an email'),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);
