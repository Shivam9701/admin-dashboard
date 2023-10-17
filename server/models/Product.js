import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    },
    rating: {
        type: Number,
    },
    supply: {
        type: Number,
    },

}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;