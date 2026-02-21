require('dotenv').config();
const Product = require('../Models/Products');  

const createProduct = async (req,res) => {
    try{
        const {name, description, price} = req.body;
        if(!name || !price){
            return res.status(400).json({msg: "missing required fields"});
        }
        const product = await Product.create({
            name,
            description,
            price
        });
        res.status(201).json({
            msg: "product created successfully",
            data: product
        });
    } catch(error){
        console.log(error);
    }
}


const getAllProducts = async (req,res) => {
    try{
        const products = await Product.find();
        res.status(200).json({
            msg: "products retrieved successfully", 
            data: products
        });
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    createProduct,
    getAllProducts
}
