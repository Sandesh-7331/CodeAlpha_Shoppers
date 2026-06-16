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

app.get("/", (req, res) => {
    res.send("Express App is Running")
})

//Image Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//Creating Upload Endpoint for images
app.use('/images', express.static('uploads/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products
const product = mongoose.model("product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
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
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    let products = await product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;

    }
    const newProduct = new product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(newProduct);
    await newProduct.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name
    })
})

app.post('/removeproduct', async (req, res) => {
    await product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Schema for User model
const Users = mongoose.model('Users', {
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
    }
})

// Endpoint for registering the user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with same email address" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})

// Endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
})

// Endpoint to get all products
app.get('/allproducts', async (req, res) => {
    let products = await product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Endpoint for new collection data
app.get('/newcollections', async (req, res) => {
    let products = await product.find({});
    let newcollection = products.slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// Endpoint for popular in women section
app.get('/popularinwomen', async (req, res) => {
    let products = await product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "please authenticate using a valid token" })
        }
    }
}

// Endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true, message: "Added" });
})

// Endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true, message: "Removed" });
})

// Endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

// Endpoint to clear cart after order placement
app.post('/clearcart', fetchUser, async (req, res) => {
    console.log("ClearCart");
    let cart = {};
    for (let i = 0; i < 301; i++) {
        cart[i] = 0;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: cart });
    res.json({ success: true, message: "Cart Cleared" });
})

// Schema for Orders
const Order = mongoose.model('Order', {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    items: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    date: { type: Date, default: Date.now }
})

// Endpoint to place order (called from frontend checkout)
app.post('/placeorder', fetchUser, async (req, res) => {
    const newOrder = new Order({
        customerName: req.body.customerName,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        paymentMethod: req.body.paymentMethod,
        items: req.body.items,
        totalAmount: req.body.totalAmount,
    });
    await newOrder.save();
    console.log("Order Placed");
    res.json({ success: true, message: "Order placed successfully" });
})

// Endpoint to get all orders (for admin panel)
app.get('/allorders', async (req, res) => {
    const orders = await Order.find({}).sort({ date: -1 });
    console.log("All Orders Fetched");
    res.json(orders);
})

// Endpoint to clear cart after order placement
app.post('/clearcart', fetchUser, async (req, res) => {
    console.log("ClearCart");
    let cart = {};
    for (let i = 0; i < 301; i++) {
        cart[i] = 0;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: cart });
    res.json({ success: true, message: "Cart Cleared" });
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port)
    }
    else {
        console.log("Error : " + error)
    }
})