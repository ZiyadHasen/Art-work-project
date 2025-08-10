import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('Error handler caught:', err);
  
  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      msg: 'File size too large. Maximum size is 5MB.' 
    });
  }
  
  if (err.message === 'Only image files are allowed') {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      msg: 'Only image files are allowed' 
    });
  }
  
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'something went wrong try again later';

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
