import Artwork from '../models/ArtworkModel.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const getAllArtworks = async (req, res) => {
  const artworks = await Artwork.find({ createdBy: req.user.userId });
  // console.log(req.user.name);
  // console.log(artworks);
  res.status(StatusCodes.OK).json({ artworks });
};

export const createArtwork = async (req, res) => {
  try {
    const newArtwork = { ...req.body };
    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path, {
        transformation: [{ width: 773, height: 579, crop: 'fill' }],
      });
      await fs.unlink(req.file.path);
      newArtwork.avatar = response.secure_url;
      newArtwork.avatarPublicId = response.public_id;
    }

    // Adding fields to newArtwork
    newArtwork.createdBy = req.user.userId;
    newArtwork.createdByName = req.user.name;

    const artwork = await Artwork.create(newArtwork);
    res.status(StatusCodes.CREATED).json({ artwork });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to create artwork. Please try again later.',
      error: error.message,
    });
  }
};
export const getArtwork = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);
  res.status(StatusCodes.OK).json({ artwork });
};

export const updateArtwork = async (req, res) => {
  try {
    // Find the existing artwork to get the current avatarPublicId
    const existingArtwork = await Artwork.findById(req.params.id);
    if (!existingArtwork) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Artwork not found' });
    }

    const newArtwork = { ...req.body };
    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path, {
        transformation: [{ width: 500, height: 500, crop: 'fill' }],
      });
      await fs.unlink(req.file.path);
      newArtwork.avatar = response.secure_url;
      newArtwork.avatarPublicId = response.public_id;
    }

    const updatedArtwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      newArtwork,
      {
        new: true,
      }
    );

    // If a new file was uploaded and there was an existing avatar, delete the old one
    if (req.file && existingArtwork.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(existingArtwork.avatarPublicId);
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Artwork modified', updatedArtwork });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to update artwork. Please try again later.',
      error: error.message,
    });
  }
};

export const deleteArtwork = async (req, res) => {
  const removedArtwork = await Artwork.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: 'artwork deleted', artwork: removedArtwork });
};
