const mongoose = require("mongoose");

// Database connection
mongoose.connect("mongodb+srv://E-Commerce_Shoppers:S%40ndesh06@cluster0.tokfvqq.mongodb.net/E-Commerce");

// Schema for Products
const productSchema = new mongoose.Schema({
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
});

const Product = mongoose.model("product", productSchema);

const seedDatabase = async () => {
    try {
        console.log("Connecting to database and clearing existing products...");
        await Product.deleteMany({});
        console.log("Database cleared.");

        const products = [];

        for (let i = 1; i <= 36; i++) {
            let name = "";
            let category = "";
            let new_price = 400.0;
            let old_price = 650.0;

            if (i <= 12) {
                name = "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse";
                category = "women";
                if (i === 1) { new_price = 500.0; old_price = 800.5; }
                else if (i === 2) { new_price = 400.0; old_price = 650.0; }
                else if (i === 3) { new_price = 600.0; old_price = 1000.5; }
                else if (i === 4) { new_price = 1000.0; old_price = 1500.0; }
            } else if (i <= 24) {
                name = "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket";
                category = "men";
            } else {
                name = "Boys Orange Colourblocked Hooded Sweatshirt";
                category = "kid";
            }

            products.push({
                id: i,
                name: name,
                category: category,
                image: `http://localhost:4000/images/product_${i}.png`,
                new_price: new_price,
                old_price: old_price
            });
        }

        console.log("Inserting 36 original products...");
        await Product.insertMany(products);
        console.log("Database seeded successfully with 36 products!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
