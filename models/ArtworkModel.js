import mongoose from 'mongoose';
import { ARTWORK_STATUS, ARTWORK_TYPE } from '../utils/constants.js';

const Artwork = new mongoose.Schema(
  {
    title: String,
    description: String,
    location: String,
    price: String,

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    createdByName: String, // Adding createdByName field
  },
  { timestamps: true }
);

export default mongoose.model('Art', Artwork);
