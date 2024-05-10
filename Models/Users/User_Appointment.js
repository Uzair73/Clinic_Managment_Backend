const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Appointment_Date:{
        type: String,
        required: true
    },
    Appointment_Time:{
        type: String,
        required: true
    },
    Issue:{
        type: String,
        required: true
    }
},
    {
        timestamps : true
    }
);
const usermodel = mongoose.model('User_Appointment',UserSchema)
module.exports = usermodel