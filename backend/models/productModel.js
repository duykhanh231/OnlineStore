import mongoose from 'mongoose';

// A review is a sub-document, part of a product
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // e.g., 4.5
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    // We will link products to the admin user who created them
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Adds a relationship between Product and User
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema], // An array of review sub-documents
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;