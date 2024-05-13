import mongoose from 'mongoose';
import { ARTWORK_STATUS, ARTWORK_TYPE } from '../utils/constants.js';

const Artwork = new mongoose.Schema(
  {
    company: String,
    position: String,
    artworkStatus: {
      type: String,
      enum: Object.values(ARTWORK_STATUS),
      default: ARTWORK_STATUS.PENDING,
    },
    artworkType: {
      type: String,
      enum: Object.values(ARTWORK_TYPE),
      default: ARTWORK_TYPE.DRAWING,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Art', Artwork);
