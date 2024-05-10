const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Email:{
        type : String,
        unique: true,
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
const usermodel = mongoose.model('Admin-auth',UserSchema)
module.exports = usermodel;