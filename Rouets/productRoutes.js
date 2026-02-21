const express = require('express');
const router = express.Router();
const {createProduct, getAllProducts,deleteProduct} = require('../Controller/productController');

router.post('/products', createProduct);
router.get('/products', getAllProducts);

router.delete('/products/:id', deleteProduct);
module.exports = router;