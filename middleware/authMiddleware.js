import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtil.js';

export const authenticateUser = (req, res, next) => {
  console.log('Authenticating user...');
  console.log('Cookies:', req.cookies);
  
  const { token } = req.cookies;
  if (!token) {
    console.log('No token found in cookies');
    throw new UnauthenticatedError('authentication invalid');
  }
  
  try {
    const { userId, role, name } = verifyJWT(token);
    const isDemoUser = role === 'demo';
    const testUser = userId === '664ca606aeaabadce6e148bb';
    req.user = { userId, role, name, testUser, isDemoUser };
    console.log('User authenticated:', { userId, role, name, isDemoUser });
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};

export const restrictDemoUser = (req, res, next) => {
  if (req.user.isDemoUser) {
    throw new UnauthorizedError('Demo users cannot perform this action. Please register for a full account.');
  }
  next();
};


