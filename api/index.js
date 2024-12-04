import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import counselorRoutes from './routes/counselor.route.js';
import adminRoutes from './routes/admin.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

//mongoose.connect(process.env.MONGO)
mongoose.connect('mongodb+srv://karimaakternov2001:XJ4E6xhWEbJXcqtp@merncluster.t1qgi.mongodb.net/counseling-center-db?retryWrites=true&w=majority&appName=mernCluster').then(() =>{
    console.log('connected to mongodb')
})
.catch((err) => {
    console.log(err)
})

// if (!process.env.MONGO) {
//     console.error("Error: MONGO URI is not defined in the environment variables.");
//     process.exit(1); // Exit the process if the environment variable is missing
// }


const app = express();
app.use(express.json());
app.use(cookieParser());
//app.use(cors());
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5175'];
app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies
  }));

app.listen(3000, () =>
{
    console.log("Listening to port 3000");
})
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/counselor", counselorRoutes);
app.use("/api/admin", adminRoutes);





app.use((err, req, res, next) => {
    try {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        });
    } catch (error) {
      
    }
  });