import mongoose from 'mongoose';

const ArtworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdByName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    avatarPublicId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Artwork', ArtworkSchema);
