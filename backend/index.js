const port = 4000; 
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


mongoose
  .connect("mongodb+srv://nilesh:nileshkumar@cluster0.qbeje.mongodb.net/");


// API creation 
app.get("/", (req, res) => {
  res.send("Express App is running");
});


// Image storage Engine

const storage = multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
    return cb(null, `${file.fieldname}_${Date.now}${path.extname(file.originalname)}`)
  }
})



const Upload = multer({storage:storage});


// creating upload endpoint 
app.use('/images', express.static('upload/images'))
app.post('./upload', Upload.single('product',(req,res)=>{
  res.json({
     success:1,
     Image_url:`http://localhost: ${port}/images/${req.file.filename}`
  })
}))





// schema for creating product

const product = mongoose.model("Product",{
  id:{
    type: Number,
    required:true,
  },
  name:{
    type: String,
    required: true,
  },
  image:{
    type:string,
    
  }
})















app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
