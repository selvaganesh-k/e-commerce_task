const ProductModel = require('../models/ProductModel');

exports.addProducts=async(req, res)=>{
    try{
    const{productName, fullPrice, 
        reducePrice, productDes, 
        availableKilograms, forSale,
        deliveryCharge} =req.body;
        if(!productName || !fullPrice || !reducePrice || !productDes || !availableKilograms || !forSale || !deliveryCharge){
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload at least one image' });
        }
        const imagePaths = req.files.map(file => file.path.replace(/\\/g, '/')).join(',');
        console.log(ProductModel)
        
        const newProduct = await ProductModel.create({
            productName,fullPrice,
            reducePrice,productDes,
            availableKilograms,forSale,
            imagePaths, deliveryCharge
        })
        return res.status(201).json({message:"Product created",product:newProduct});
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
        
}

exports.getallProducts=async(req, res)=>{
    try{
        const products = await ProductModel.findAll();
        
        return res.status(200).json({products});
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const{productName, fullPrice, 
        reducePrice, productDes, 
        availableKilograms, forSale,
        deliveryCharge} =req.body;

    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload at least one image' });
        }

        let imagePaths = req.body.imagePaths || '';
        const uploadPaths = req.files.map(file => file.path.replace(/\\/g, '/'));
        imagePaths = uploadPaths.join(',')
        console.log(imagePaths)
        const updateData = {
            productName, fullPrice, 
        reducePrice, productDes, 
        availableKilograms, forSale,
        imagePaths,deliveryCharge
        }
        console.log(updateData)
        const product = await ProductModel.findOne({
            where: { id: id }
        });
        Object.assign(product, updateData);
        await product.save();
        res.status(200).json({ updatedProduct: product });

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.getUpdateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const Product = await ProductModel.findOne({
            where: {
                id: productId,
            },
        });
        if (!Product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(Product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedProduct = await ProductModel.destroy({
            where: { id: id },
        });

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
