import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyTokenC = (req, res, next) => {
  try {
    console.log("Verifying token...");
    const token = req.cookies?.access_token_c; // Check if `cookies` is defined
    if (!token) {
      console.log("Token not found");
      return next(errorHandler(401, 'You are not authenticated!'));
    }

    jwt.verify(token,'299', (err, counselor) => {
      if (err) {
        console.log("Token verification failed:", err.message);
        return next(errorHandler(403, 'Token is not valid!'));
      }
      console.log("Token verified successfully:", counselor);
      req.counselor = counselor; // Attach decoded counselor info to the request
      
      req.body.counselorId = counselor.id;
      next();
    });
  } catch (error) {
    console.error("Unexpected error in verifyToken middleware:", error);
    next(errorHandler(500, 'Internal server error')); // Catch unexpected errors
  }
};