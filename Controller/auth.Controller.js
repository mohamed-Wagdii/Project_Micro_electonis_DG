require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../Models/User');

const registerUser = async (req, res) => {
    try {
        
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "missing required fields" });
        }

        const exsistUser = await User.findOne({ email });
        if (exsistUser) {
            return res.status(400).json({ msg: "email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json({
             msg: "user created successfully",
             data: user 
            });

    } catch (error) {
        console.log(error);
    }
}

const loginUser = async(req,res)=> {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg: "missing required fields"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "user not found"});
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword){
            return res.status(400).json({msg: "invalid password"});
        }
        const authCode = Buffer.from(user._id.toString()).toString('base64');
        res.status(200).json({
            msg: "login successful", 
            authCode
        });

    } catch(error){
        console.log(error);
    }
}

module.exports = {
    registerUser,
    loginUser
}