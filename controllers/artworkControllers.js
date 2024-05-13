import Artwork from '../models/ArtworkModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllArtworks = async (req, res) => {
  console.log(req.user);
  const artworks = await Artwork.find({ createdBy: req.user.userId });
  // console.log(artworks);
  res.status(StatusCodes.OK).json({ artworks });
};

export const createArtwork = async (req, res) => {
  // *here we are adding another field in the req.body
  req.body.createdBy = req.user.userId;
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
