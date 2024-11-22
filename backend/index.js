const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); 

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection



mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://nilesh:nileshkumar@cluster0.qbeje.mongodb.net/yourDBName",
  {
  
    
    serverSelectionTimeoutMS: 30000, // Adjust to 30 seconds
    socketTimeoutMS: 45000,         // Adjust to 45 seconds
  }
);
















// API home route
app.get("/", (req, res) => {
  res.send("Express App is running");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "./upload/images");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Ensure 'upload/images' folder exists
const fs = require("fs");
const dir = path.join(__dirname, "./upload/images");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Serve uploaded images
app.use("/images", express.static(path.join(__dirname, "./upload/images")));





app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Define Product Schema and Model
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

// Add Product Endpoint
app.post("/addproducts", async (req, res) => {
  try {
   
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const { name, image, category, new_price, old_price, available } = req.body;

    // Create a new product instance
    const product = new Product({
      id: newId,
      name,
      image,
      category,
      new_price,
      old_price,
      available,
    });

    // Save product to the database
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
});



// Remove Product Endpoint
app.post('/removeproduct', async (req, res) => {

  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed");
  res.json({
    success:true,
    name:req.body.name,
  })

});

// add all the products

app.get('/allproduct',async(req,res)=>{
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
})







// Start the server
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});




// Rename the 'user' model to 'UserModel' to avoid conflict
const UserModel = mongoose.model('Users', {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating the endpoint for registering the user
app.post('/signup', async (req, res) => {
  let check = await UserModel.findOne({ email: req.body.email });

  if (check) {
    return res.status(400).json({ success: false, errors: "Existing Users found with the same email" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const newUser = new UserModel({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await newUser.save();

  const data = {
    user: {
      id: newUser.id,
    }
  };

  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token });
});

// Creating the endpoint for logging in the user
app.post('/login', async (req, res) => {
  let user = await UserModel.findOne({email:req.body.email}); 
  if (user) {
    const passcompare = req.body.password === user.password;
    if (passcompare) {
      const data = {
        user: {
          id: user.id,
        }
      };

      const token = jwt.sign(data, 'secret_ecom');
      res.json({success: true, token});
    } else {
      res.status(400).json({success: false, errors: "Wrong password"});
    }

  } else {
    res.status(400).json({success: false, errors: "Wrong Email id"});
  }
});






// creating endpoint for new collection data


app.get('/newcollection',async(req,res)=>{
  let products = await Product.find({});

  let newcollection  = products.slice(1).splice(-8);
  console.log("new COllection fetched");
  res.send(newcollection);
})














// payment gateway




const stripe = require('stripe')('sk_test_51QNVRfK0MnJ6utZuh1IJHh7nhkMXZ5asp1NWKO67Roi2yzxfptD5TAjj2KpGCuPnaEkIJJG9nx30c8R410FukvZJ00TCk1iycW');

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send(error.message);
  }
});



// Endpoint to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    // Ensure amount is valid
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount." });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});






const orderSchema = new mongoose.Schema({
  cartItems: Array,
  totalAmount: Number,
  shippingDetails: Object,
  paymentStatus: String,
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

app.post("/api/order", async (req, res) => {
  try {
    const { cartItems, totalAmount, shippingDetails, paymentStatus } = req.body;

    if (!cartItems || cartItems.length === 0 || totalAmount <= 0 || !shippingDetails) {
      return res.status(400).json({ error: "Invalid order details." });
    }

    // Save order to the database
    const newOrder = new Order({ cartItems, totalAmount, shippingDetails, paymentStatus });
    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order successfully placed!", order: savedOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
