const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { email, password, isAdmin } = req.body;
    if ( !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await UserModel.findOne({where: {email} });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            email,
            password: hashPassword,
            isAdmin
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.loginUser=async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const existingUser = await UserModel.findOne({where:{email:email}});
        if(!existingUser){
            return res.status(400).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        console.log(existingUser);
        return res.status(200).json({ message: "Login successful",user:{
            id: existingUser.id,
            email: existingUser.email
        } });
    }
    catch(error){
        res.status(500).json({message:"Server error", error: error.message});
    }
}

exports.getUsers= async(req, res)=>{
    try{
        const users = await UserModel.findAll({where:{isAdmin:false}});
        return res.status(200).json({users});
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await UserModel.destroy({
            where: { id: id },
        });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
