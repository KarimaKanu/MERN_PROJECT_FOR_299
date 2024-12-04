

// import jwt from 'jsonwebtoken';
// import { errorHandler } from './error.js';

// export const verifyToken = (req, res, next) => {
//   try {
//     console.log("Verifying token...");
//     const token = req.cookies?.access_token; // Check if `cookies` is defined
//     if (!token) {
//       console.log("Token not found");
//       return next(errorHandler(401, 'You are not authenticated!'));
//     }

//     jwt.verify(token,'299', (err, user) => {
//       if (err) {
//         console.log("Token verification failed:", err.message);
//         return next(errorHandler(403, 'Token is not valid!'));
//       }
//       console.log("Token verified successfully:", user);
//       req.user = user; // Attach decoded user info to the request
     
//       req.body.userId = user.id;
//       next();
//     });
//   } catch (error) {
//     console.error("Unexpected error in verifyToken middleware:", error);
//     next(errorHandler(500, 'Internal server error')); // Catch unexpected errors
//   }
// };



import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  try {
    console.log("Verifying token...");
    
    // Check for token in Authorization header or cookies
    const token =
      req.cookies?.access_token || // From cookies
      req.headers.authorization?.split(' ')[1]; // From Authorization header

    if (!token) {
      console.log("Token not found in cookies or Authorization header");
      return next(errorHandler(401, 'You are not authenticated!'));
    }

    // Verify token
    jwt.verify(token, '299', (err, user) => {
      if (err) {
        console.log("Token verification failed:", err.message);
        return next(errorHandler(403, 'Token is not valid!'));
      }

      console.log("Token verified successfully:", user);
      req.user = user; // Attach decoded user info to the request
      req.body.userId = user.id; // Attach userId to the request body for further use
      next();
    });
  } catch (error) {
    console.error("Unexpected error in verifyToken middleware:", error);
    next(errorHandler(500, 'Internal server error')); // Catch unexpected errors
  }
};