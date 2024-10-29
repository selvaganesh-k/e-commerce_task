const express = require('express');
const route = express.Router();
const upload = require('../middleware/multer');
const {registerUser, loginUser, getUsers, deleteUser} = require('../controllers/userController');

route.post('/register',registerUser);
route.post('/login',loginUser);
route.get('/allUsers', getUsers);
route.delete('/deleteUser/:id',deleteUser);

const {addProducts, getallProducts, getUpdateProduct, updateProduct, deleteProduct} = require('../controllers/productController')
route.post('/addProducts', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        addProducts(req, res, next);
    });
});
route.get('/getAll', getallProducts);
route.get('/products/:id', getUpdateProduct);

route.put('/updateProduct/:id',(req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        updateProduct(req, res, next);
    });
});
route.delete('/deleteProduct/:id',deleteProduct);

const {addtoCart, getAllCarts, deleteCart, getUpdateCart, updateCart} = require('../controllers/cartController');
route.post('/addtocart',addtoCart);
route.get('/getAllCarts', getAllCarts);
route.delete('/carts/:id', deleteCart);
route.get('/getUpdateCart/:id',getUpdateCart);
route.put('/updateCart',updateCart);

const {addOrders, getOrders} = require('../controllers/orderController');
route.post('/order',addOrders);
route.get('/getAllOrders', getOrders);
module.exports=route;