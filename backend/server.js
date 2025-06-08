import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Note the path

// Import route files
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// This allows us to accept JSON data in the body of requests
app.use(express.json());

// A simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount the routers
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); 

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in development mode on port ${PORT}`)
);