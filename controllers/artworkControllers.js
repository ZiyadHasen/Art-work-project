import Artwork from '../models/ArtworkModel.js';
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';

export const getAllArtworks = async (req, res) => {
  try {
    const { search, location, sort } = req.query;
    const queryObject = {};

    // For demo users, show all artworks (don't exclude their own)
    if (!req.user.isDemoUser) {
      // Exclude current user's artworks from the results for real users
      queryObject.createdBy = { $ne: req.user.userId };
    }

    if (search || location) {
      // Check if search or location is present
      if (search && location) {
        queryObject.$and = [
          { title: { $regex: search, $options: 'i' } },
          { location: { $regex: location, $options: 'i' } },
        ];
        // Only exclude user's own artworks for real users
        if (!req.user.isDemoUser) {
          queryObject.$and.push({ createdBy: { $ne: req.user.userId } });
        }
      } else if (search) {
        queryObject.$and = [
          { title: { $regex: search, $options: 'i' } },
        ];
        // Only exclude user's own artworks for real users
        if (!req.user.isDemoUser) {
          queryObject.$and.push({ createdBy: { $ne: req.user.userId } });
        }
      } else {
        queryObject.$and = [
          { location: { $regex: location, $options: 'i' } },
        ];
        // Only exclude user's own artworks for real users
        if (!req.user.isDemoUser) {
          queryObject.$and.push({ createdBy: { $ne: req.user.userId } });
        }
      }
    }

    const sortOptions = {
      newest: '-createdAt',
      oldest: 'createdAt',
      'a-z': 'title',
      'z-a': '-title',
    };

    const sortKey = sortOptions[sort] || sortOptions.newest;

    // ! setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    const artworks = await Artwork.find(queryObject)
      .sort(sortKey)
      .skip(skip)
      .limit(limit);

    const totalArtworks = await Artwork.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalArtworks / limit);
    res.status(StatusCodes.OK).json({ totalArtworks, numOfPages, artworks });
  } catch (error) {
    console.error('Error in getAllArtworks:', error);
    // If database is not available, return empty results
    res.status(StatusCodes.OK).json({ totalArtworks: 0, numOfPages: 0, artworks: [] });
  }
};

export const getMyArtworks = async (req, res) => {
  try {
    // Demo users get mock artworks for demonstration
    if (req.user.isDemoUser) {
      const mockArtworks = [
        {
          _id: 'demo_artwork_1',
          title: 'Demo Artwork 1',
          description: 'This is a demo artwork for preview purposes',
          price: 150,
          location: 'Demo City',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
          createdAt: new Date(),
          createdBy: req.user.userId,
        },
        {
          _id: 'demo_artwork_2',
          title: 'Demo Artwork 2',
          description: 'Another demo artwork to show functionality',
          price: 200,
          location: 'Demo City',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
          createdAt: new Date(),
          createdBy: req.user.userId,
        },
      ];
      return res.status(StatusCodes.OK).json({ artworks: mockArtworks });
    }

    const artworks = await Artwork.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ artworks });
  } catch (error) {
    console.error('Error in getMyArtworks:', error);
    // If database is not available but user is demo, return mock data
    if (req.user.isDemoUser) {
      const mockArtworks = [
        {
          _id: 'demo_artwork_1',
          title: 'Demo Artwork 1',
          description: 'This is a demo artwork for preview purposes',
          price: 150,
          location: 'Demo City',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
          createdAt: new Date(),
          createdBy: req.user.userId,
        },
        {
          _id: 'demo_artwork_2',
          title: 'Demo Artwork 2',
          description: 'Another demo artwork to show functionality',
          price: 200,
          location: 'Demo City',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
          createdAt: new Date(),
          createdBy: req.user.userId,
        },
      ];
      return res.status(StatusCodes.OK).json({ artworks: mockArtworks });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error fetching artworks' });
  }
};

export const createArtwork = async (req, res) => {
  try {
    console.log('Creating artwork with body:', req.body);
    console.log('File:', req.file);
    console.log('User:', req.user);
    
    const newArtwork = { ...req.body };
    if (req.file) {
      console.log('Uploading file to Cloudinary:', req.file.path);
      const response = await cloudinary.uploader.upload(req.file.path);
      console.log('Cloudinary response:', response);
      await fs.unlink(req.file.path);
      newArtwork.avatar = response.secure_url;
      newArtwork.avatarPublicId = response.public_id;
    }

    // Adding fields to newArtwork
    newArtwork.createdBy = req.user.userId;
    newArtwork.createdByName = req.user.name;
    
    console.log('Creating artwork with data:', newArtwork);
    const artwork = await Artwork.create(newArtwork);
    console.log('Artwork created successfully:', artwork);
    res.status(StatusCodes.CREATED).json({ artwork });
  } catch (error) {
    console.error('Error in createArtwork:', error);
    console.error('Error stack:', error.stack);
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
      try {
        const response = await cloudinary.uploader.upload(req.file.path);

        await fs.unlink(req.file.path); // Delete file after successful upload
        newArtwork.avatar = response.secure_url;
        newArtwork.avatarPublicId = response.public_id;

        // If there was an existing avatar, delete the old one
        if (existingArtwork.avatarPublicId) {
          const destroyResponse = await cloudinary.uploader.destroy(
            existingArtwork.avatarPublicId
          );
          console.log('Cloudinary destroy response:', destroyResponse);
        }
      } catch (uploadError) {
        console.error(uploadError);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to upload the new avatar. Please try again later.',
          error: uploadError.message,
        });
      }
    }

    // Update the existing artwork with newArtwork data
    for (const key in newArtwork) {
      existingArtwork[key] = newArtwork[key];
    }

    // Save the updated artwork
    const updatedArtwork = await existingArtwork.save();

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
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Artwork not found' });
    }

    if (artwork.avatarPublicId) {
      await cloudinary.uploader.destroy(artwork.avatarPublicId);
    }

    await Artwork.findByIdAndDelete(req.params.id);

    res.status(StatusCodes.OK).json({ msg: 'Artwork deleted' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to delete artwork. Please try again later.',
      error: error.message,
    });
  }
};
