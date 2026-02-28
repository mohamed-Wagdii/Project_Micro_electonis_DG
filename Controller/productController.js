require('dotenv').config();
const Product = require('../Models/Products');


const createProduct = async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({
                msg: "Access denied. Admins only"
            });
        }

        const { name, description, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({ msg: "missing required fields" });
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

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error" });
    }
};
// const createProduct = async (req,res) => {
//     try{
//         const {name, description, price} = req.body;
//         if(!name || !price){
//             return res.status(400).json({msg: "missing required fields"});
//         }
//         const product = await Product.create({
//             name,
//             description,
//             price
//         });
//         res.status(201).json({
//             msg: "product created successfully",
//             data: product
//         });
//     } catch(error){
//         console.log(error);
//     }
// }


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
const deleteProduct = async (req, res) => {
     try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({msg: "product not found"});
        }
        res.status(200).json({
            msg: "product deleted successfully",
            data: product
        });
     }catch(error){
         console.log(error);
     }
}

const serchProduct = async (req, res) => {
    try{
        const {name} = req.params;
        const product = await Product.find({
            name:{
                $regex: name,
                $options: 'i'
            }
        });
        if(!product){
            return res.status(404).json({msg: "product not found"});
        }
        res.status(200).json({
            msg: "product searched successfully",
            data: product
        });
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    serchProduct
}

