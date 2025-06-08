import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js'; // We'll create this in a moment
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js'; // We'll need this to clear orders too
import connectDB from './config/db.js';

dotenv.config(); 
connectDB();

const importData = async () => {
  try {
    // Clear out the database first
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert the sample users
    const createdUsers = await User.insertMany(users);

    // Get the admin user (the first user in our sample data)
    const adminUser = createdUsers[0]._id;

    // Add the admin user's ID to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert the sample products
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear out the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Check for command-line arguments to decide what to do
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}