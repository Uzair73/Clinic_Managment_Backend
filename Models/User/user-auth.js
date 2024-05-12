const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    First_Name:{
        type : String,
        required: true
    },
    Last_Name:{
        type : String,
        required: true
    },
    User_Name:{
        type : String,
        required: true
    },
    Phone_Number:{
        type : String,
        required: true
    },
    Password:{
        type: String,
        required: true
    }
},
    {
        timestamps : true
    }
);
const usermodel = mongoose.model('Users',UserSchema)
module.exports = usermodel;