const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // To use environment variables

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://nilesh:nileshkumar@cluster0.qbeje.mongodb.net/yourDBName"
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






// Schema for creating the user model

const user = mongoose.model('Users', {
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
  let check = await user.findOne({ email: req.body.email });





  if (check) {
    return res.status(400).json({ success: false, errors: "Existing Users found with the same email" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const newUser = new user({
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



// // Creating the endpoint for logging in the user


app.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier) {
    return res.status(400).json({ success: false, error: "Identifier (email or username) is required" });
  }

  try {
    let existingUser;
    
    // Check if identifier is an email or username
    if (identifier.includes('@')) {
      existingUser = await user.findOne({ email: identifier });
    } else {
      existingUser = await user.findOne({ username: identifier });
    }

    if (!existingUser) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    const data = {
      user: {
        id: existingUser.id,
      }
    };

    const token = jwt.sign(data, 'secret_ecom', { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});











// // Get All Products with Pagination and Search

// app.get("/allproduct", async (req, res) => {
//   const { page = 1, limit = 10, search = "", category = "" } = req.query;

//   // Validate page and limit parameters
//   const pageNum = Math.max(1, parseInt(page, 10)); // Default to 1 if invalid
//   const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10))); // Default to 10, max 100

//   try {
//     // Build the query object
//     const query = {
//       ...(search && { name: new RegExp(search, "i") }), 
//       ...(category && { category })
//     };

//     // Fetch products with pagination
//     const products = await Product.find(query)
//       .skip((pageNum - 1) * limitNum)
//       .limit(limitNum);

//     // Get total product count based on query
//     const total = await Product.countDocuments(query);

//     // Send success response
//     res.status(200).json({
//       success: true,
//       message: "Products fetched successfully",
//       data: {
//         products,
//         total,
//         page: pageNum,
//         limit: limitNum,
//         totalPages: Math.ceil(total / limitNum),
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error); // Log the error
//     res.status(500).json({
//       success: false,
//       message: "Error fetching products",
//       error: error.message,
//     });
//   }
// });
