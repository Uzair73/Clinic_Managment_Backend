// Define the User Schema
const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    First_Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    },
    Schedule: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    Image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor_Image'
    }
}, {
    timestamps: true
});
// Create the User model
const usermodel = mongoose.model('Doctor_list', userschema);
module.exports = usermodel;