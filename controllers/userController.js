import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Artwork from '../models/ArtworkModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
  try {
    // Handle demo users who don't exist in the database
    if (req.user.isDemoUser) {
      const demoUser = {
        _id: req.user.userId,
        name: req.user.name,
        email: 'demo@example.com',
        lastName: 'Demo',
        location: 'Demo City',
        role: 'demo',
        avatar: '',
        avatarPublicId: '',
      };
      return res.status(StatusCodes.OK).json({ user: demoUser });
    }

    const user = await User.findOne({ _id: req.user.userId });
    // toJSON is function that is defined in the users model
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  } catch (error) {
    // If database is not available but user is demo, still return demo user
    if (req.user.isDemoUser) {
      const demoUser = {
        _id: req.user.userId,
        name: req.user.name,
        email: 'demo@example.com',
        lastName: 'Demo',
        location: 'Demo City',
        role: 'demo',
        avatar: '',
        avatarPublicId: '',
      };
      return res.status(StatusCodes.OK).json({ user: demoUser });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error fetching user' });
  }
};
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const artworks = await Artwork.countDocuments();
  res.status(StatusCodes.OK).json({ users, artworks });
};

export const getPublicStats = async (req, res) => {
  const users = await User.countDocuments();
  const artworks = await Artwork.countDocuments();
  res.status(StatusCodes.OK).json({ users, artworks });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
