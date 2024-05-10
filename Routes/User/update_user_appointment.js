const express= require('express'); // import express js
const user_appointment = require('../../Models/Users/User_Appointment'); // import user-schema model
const  router = express.Router(); // import router express to take a paths
var fetchusers = require('../../middleware/fetchuser')



//Router 1)update a user-appointment if user want. -- using put request: login required.
 router.put('/update-appointment/:id',fetchusers , async (req,res) =>{
    
    try{
     const {Appointment_Date,Appointment_Time,Issue} = req.body
     const new_appointment = {}
     if(Appointment_Date){new_appointment.Appointment_Date = Appointment_Date}
     if(Appointment_Time){new_appointment.Appointment_Time = Appointment_Time}
     if(Issue){new_appointment.Issue = Issue}

     const add_appointment = await user_appointment.findByIdAndUpdate(req.params.id,{$set:new_appointment
        },{new:true})
     res.json({add_appointment})
    }
     catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
      }
 })

 module.exports = router;
