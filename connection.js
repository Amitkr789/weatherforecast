const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/realdata').then(() => {
    console.log('Connection successfull !');
}).catch((err) => {
    console.log(err);
});

//create schema 
const Schemamodel = new mongoose.Schema({
    name: String,
    email: String,
    password: Number,
    Cpass: Number,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});

// CREATE MODEL 
const createModer = new mongoose.model('Register', Schemamodel);

// create document 
const CreateDocument = async() => {
    try {
        const nowcraete = new createModer({
            name: 'Amit kumar thakur',
            email: 'alpswebinfotech@gmail.com',
            password: 12345,
            Cpass: 12345,
            active: true
        });
        const result = await nowcraete.save();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}