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


mongoose.connect(process.env.MONGO).then(() =>{
    console.log('connected to mongodb')
})
.catch((err) => {
    console.log(err)
})


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

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
       console.log("ekhane fakap: ", error); 
    }
  });