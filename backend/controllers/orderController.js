const OrderModel = require('../models/OrderModel');
const CartModal =require('../models/AddToCartModel');
const ProductModel = require('../models/ProductModel');

exports.addOrders=async(req, res)=>{
    try{
    const{name, email, phoneNo, address, city, state, pincode, totalamount, orderdProducts} =req.body;

        if(!name || !email|| !phoneNo || !address || !city || !state || !pincode || !totalamount || !orderdProducts){

            return res.status(400).json({ message: 'All fields are required' });
        }
        const deletedAllCart = await CartModal.destroy({
            where: { email:email }
        });

        const products = orderdProducts.split(',');
        for (const product of products) {
            const [productId, quantity] = product.split(':');
            const productid = Number(productId);
            const productqty = Number(quantity);

            const orderedProduct = await ProductModel.findOne({ where: {id: productid } });

            if (!orderedProduct) {
                return res.status(404).json({ message: `Product with ID ${productid} not found` });
            }

            const updatedKilograms = orderedProduct.availableKilograms - productqty;
            if (updatedKilograms < 0) {
                return res.status(400).json({ message: `Insufficient stock for product ID ${productid}` });
            }

            await orderedProduct.update({ availableKilograms: updatedKilograms });
        }
        const newOrder = await OrderModel.create({
            name, email, phoneNo, 
            address, city, state, 
            pincode, totalamount, orderdProducts
        })

        return res.status(201).json({message:"Oredr Placed", Order:newOrder});
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error });
    }
        
}

exports.getOrders = async(req, res)=>{
    try{
    const orders = await OrderModel.findAll();
    return res.status(200).json({orders});
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
