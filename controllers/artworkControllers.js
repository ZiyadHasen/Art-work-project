import Artwork from '../models/ArtworkModel.js';
import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

export const getAllArtworks = async (req, res) => {
  const artworks = await Artwork.find({ createdBy: req.user.userId });
  // console.log(req.user.name);
  // console.log(artworks);
  res.status(StatusCodes.OK).json({ artworks });
};

export const createArtwork = async (req, res) => {
  // const user = await User.findById(req.user.userId).lean();

  // *here we are adding another field in the req.body
  req.body.createdBy = req.user.userId;
  req.body.createdByName = req.user.name;

  const artwork = await Artwork.create(req.body);
  res.status(StatusCodes.CREATED).json({ artwork });
};

export const getArtwork = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);
  res.status(StatusCodes.OK).json({ artwork });
};

export const updateArtwork = async (req, res) => {
  const updatedArtwork = await Artwork.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: 'artwork modified', updatedArtwork });
};

export const deleteArtwork = async (req, res) => {
  const removedArtwork = await Artwork.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: 'artwork deleted', artwork: removedArtwork });
};
