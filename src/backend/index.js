// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 3001;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/your_database_name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // ... (routes and other code)

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

const express = require("express"); // Import Express for creating the server
const mongoose = require("mongoose"); // Import Mongoose for connecting to MongoDB
const bodyParser = require("body-parser"); // Import body-parser for parsing request bodies
const cors = require("cors"); // Import cors for handling cross-origin requests
const { Product } = require("./models");
const authMiddleware = require("./middleware/auth"); // Assuming you have an authentication middleware
const app = express(); // Create an instance of the Express app
const port = process.env.PORT || 3001; // Set the port number (use environment variable or default to 3001)

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/your_database_name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json()); // Use body-parser to parse JSON data in request bodies
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)

// Import your data models (replace with the actual paths)
const { Product } = require("./models/Product"); // Import the Product model
const { User } = require("./models/User"); // Import the User model (if you have one)
const { Order } = require("./models/Order"); // Import the Order model (if you have one)

// Define API routes

// 1. Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // Find all products from the database
    res.json(products); // Send the list of products as JSON response
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" }); // Handle errors and send an error response
  }
});

// 2. (Optional) Get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from request parameters
    const product = await Product.findById(id); // Find the product by ID
    if (!product) {
      return res.status(404).json({ error: "Product not found" }); // Handle not found case
    }
    res.json(product); // Send the product details as JSON response
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" }); // Handle errors and send an error response
  }
});

// 3. (Optional) Create a new product (requires authentication and authorization logic)
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Create a new product instance from the request body
    const savedProduct = await newProduct.save(); // Save the product to the database
    res.json(savedProduct); // Send the newly created product as JSON response
  } catch (error) {
    res.status(400).json({ error: "Error creating product" }); // Handle errors and send an error response
  }
});

// 4. (Optional) Update a product (requires authentication and authorization logic)
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from request parameters
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }); // Update the product with the request body
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" }); // Handle not found case
    }
    res.json(updatedProduct); // Send the updated product as JSON response
  } catch (error) {
    res.status(400).json({ error: "Error updating product" }); // Handle errors and send an error response
  }
});

// 5. (Optional) Delete a product (requires authentication and authorization logic)
app.delete("/api/products/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
});
