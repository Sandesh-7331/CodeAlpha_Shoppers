const port = 4000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors());

//Database connection with Mongodb
mongoose.connect("mongodb+srv://E-Commerce_Shoppers:S%40ndesh06@cluster0.tokfvqq.mongodb.net/E-Commerce")

//Api Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image Storage Engine
const storage = multer.diskStorage({
    destination : './uploads/images',
    filename : (req,file,cb)=>{
        return cb(null,'${file.fieldname}_${Date.now()}${path.extname(file.originalname)}')
    }
})

const upload = multer({storage : storage})

//Creating Upload Endpoint for images
app.use('/images',express.static('uploads/images'))

app.post("/upload",upload.single('product'),(req,res)=>{ 
    res.json({
        success : 1,
        image_url : 'http://localhost:${port}/images/${req.file.filename}'
    })
})

app.listen(port,(error)=>{
    if(!error) {
        console.log("Server is running on port "+port)
    }
    else
    {
        console.log("Error : "+error)
    }
})