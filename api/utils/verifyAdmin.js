import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const authAdmin= (req, res, next) => {
  try {
    console.log("Verifying token...");
    const token = req.cookies?.access_token_a; // Check if `cookies` is defined
    if (!token) {
      console.log("Token not found");
      return next(errorHandler(401, 'You are not authenticated!'));
    }

    jwt.verify(token,'299', (err, admin) => {
      if (err) {
        console.log("Token verification failed:", err.message);
        return next(errorHandler(403, 'Token is not valid!'));
      }
      console.log("Token verified successfully:", admin);
      req.admin = admin; // Attach decoded counselor info to the request
      
      req.body.adminId = admin.id;
      next();
    });
  } catch (error) {
    console.error("Unexpected error in verifyToken middleware:", error);
    next(errorHandler(500, 'Internal server error')); // Catch unexpected errors
  }
};