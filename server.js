import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import Stripe from 'stripe';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

//! custom imports Routers
import artworkRouter from './routers/artworkRouter.js';
import userRouter from './routers/userRouter.js';
import authRouter from './routers/authRouter.js';

//! middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use('/uploads', express.static(path.resolve(__dirname, './public/uploads')));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.CLIENT_URL 
      : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);

//! Routes
app.use('/api/v1/artworks', authenticateUser, artworkRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

//! Stripe payment route
app.post('/api/v1/create-checkout-session', async (req, res) => {
  const cartItems = req.body.items;
  // console.log('Received cart items:', cartItems); // Log cart items for debugging

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.artwork.title, // Make sure this matches your cartItems structure
          },
          unit_amount: parseInt(item.artwork.price) * 100, // Stripe expects amount in cents
        },
        quantity: 1, // Adjust if necessary
      })),
      success_url: `${process.env.CLIENT_URL}/cart-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart-canceled'`,
    });
    res.json({ url: session.url });
  } catch (e) {
    console.error('Error creating checkout session:', e.message); // Log the error message
    console.error(e); // Log the full error object for more details
    res.status(500).json({ error: e.message });
  }
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

//! Error middleware
app.use(errorHandlerMiddleware);

//! Server setup
const port = process.env.PORT || 5500;
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server running on PORT ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
