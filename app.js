require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

async function dbConection() {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/MicroElectronics");
            console.log("Database connected successfully");
        
    }catch(error){
        console.log(error);
    }
}

dbConection();

