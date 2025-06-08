/* import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Note the path

// Import route files
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load env vars
dotenv.config({ path: './backend/.env' });

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

// --- DEPLOYMENT CONFIGURATION ---
const __dirname = path.resolve(); // Set __dirname to the current project directory

if (process.env.NODE_ENV === 'production') {
  // 1. Tell Express to serve the static assets from the 'frontend/build' folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // 2. For any request that doesn't match an API route, send back the main index.html file
  // This is the entry point for the React app and allows React Router to handle the routing.
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  // If not in production, just have a simple test route
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in development mode on port ${PORT}`)
); */