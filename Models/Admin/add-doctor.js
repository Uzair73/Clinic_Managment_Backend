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
    Schedule:{
        type : String,
        required: true
    },
    Status:{
        type : String,
        required: true,
    }
},
    {
        timestamps : true
    }
);
const usermodel = mongoose.model('Doctor-list',UserSchema)
module.exports = usermodel;