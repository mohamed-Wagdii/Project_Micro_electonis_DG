require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./Models/User');

const PORT = process.env.PORT || 3000

async function dbConection() {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/MicroElectronics");
            console.log("Database connected successfully");
        
    }catch(error){
        console.log(error);
    }
}

dbConection();




app.post('/register', async (req, res) => {
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
});

app.post('/login', async(req,res)=> {
    try{
        if(!email || !password){
            return res.status(400).json({msg: "missing required fields"});
        }
        const user = User.findOne({email});
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
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});