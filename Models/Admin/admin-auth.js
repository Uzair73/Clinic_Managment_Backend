const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Email:{
        type : String,
        required: true
    },
    Password:{
        type : String,
        required: true
    }
},
    {
        timestamps : true
    }
);
const usermodel = mongoose.model('Admin-authencation',UserSchema)
module.exports = usermodel;