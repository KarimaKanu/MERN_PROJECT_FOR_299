// import jwt from 'jsonwebtoken';
// import { errorHandler } from './error.js';

// export const verifyToken = (req, res, next) => {
//     try {
//         const token = req.cookies.access_token;
//         if (!token) return next(errorHandler(401, 'You are not authenticated!'));

//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if (err) return next(errorHandler(403, 'Token is not valid!'));
//             req.user = user;
//             next();
//         });

//     } catch (error) {
//         console.log(error);
//     }
//     next(errorHandler(500, 'Internal server error'));
// }

import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  try {
    console.log("Verifying token...");
    const token = req.cookies?.access_token; // Check if `cookies` is defined
    if (!token) {
      console.log("Token not found");
      return next(errorHandler(401, 'You are not authenticated!'));
    }

    jwt.verify(token,'299', (err, user) => {
      if (err) {
        console.log("Token verification failed:", err.message);
        return next(errorHandler(403, 'Token is not valid!'));
      }
      console.log("Token verified successfully:", user);
      req.user = user; // Attach decoded user info to the request
      next();
    });
  } catch (error) {
    console.error("Unexpected error in verifyToken middleware:", error);
    next(errorHandler(500, 'Internal server error')); // Catch unexpected errors
  }
};