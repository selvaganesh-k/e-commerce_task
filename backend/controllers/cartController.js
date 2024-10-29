const CartModal = require('../models/AddToCartModel');
const ProductModel = require('../models/ProductModel');

exports.addtoCart = async(req, res)=>{
    const {email, productid, quantity}= req.body;
    try{
        if(!email || !productid || !quantity){
            return res.status(400).json({message:"All fields are required"});
        }
        const product = await ProductModel.findOne({where:{id : productid}});
        if(!product){
            return res.status(400).json({message:"Product not found"});
        }
        const cart = await CartModal.findOne({where:{
            email:email,
            productid:productid
        }})
        if(cart){
            const updatecart ={
                email,
                productid,
                quantity:quantity + cart.quantity,
                total:(quantity+cart.quantity) * product.reducePrice
            }
            Object.assign(cart, updatecart);
            await cart.save();
            return res.status(200).json({message:"You already add this Cart, Now its update successfully...!", cart});
        }
        const newCart = await CartModal.create({
            email,
            productid,
            quantity,
            total:quantity*product.reducePrice
        })
        res.status(201).json({message:"Cart add successfully...!",newCart});
    }
    catch(error){
        res.status(500).json({message:"Server error" + error});
    }
}


exports.getAllCarts =async(req, res)=>{
    try{
        const carts = await CartModal.findAll();
        
        return res.status(200).json({carts});
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.deleteCart = async(req, res)=>{
    const id = req.params.id;
    try{
        const deletedCart = await CartModal.destroy({
            where: { id: id },
        });
        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart deleted successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.getUpdateCart = async(req, res)=>{
    const id= req.params.id;
    try{
        const Cart = await CartModal.findOne({
            where: {
                id: id,
            },
        });
        if (!Cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({Cart});
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart' });
    }
}

exports.updateCart = async(req, res)=>{
    const {email, productid, quantity} = req.body;
    try{
        if(!email || !productid || !quantity){
            return res.status(400).json({message:"All fields are required"});
        }
        const product = await ProductModel.findOne({where:{id : productid}});
        if(!product){
            return res.status(400).json({message:"Product not found"});
        }
        const cart = await CartModal.findOne({where:{
            email:email,
            productid:productid
        }})

        const updatecart ={
            email,
            productid,
            quantity,
            total:quantity * product.reducePrice
        }
        Object.assign(cart, updatecart);
        await cart.save();
        return res.status(200).json({message:"You already add this Cart, Now its update successfully...!", cart});
    }
    catch(error){

    }
}