const express= require('express');
const  router = express.Router();
const user_model = require('../../Models/User/appointment'); // import user-schema model
var valid_user= require('../../middleware/fetchuser')

//Router 5)Update & create new appointment if user wants using put request: login required
router.put('/update-appointment/:id',valid_user,async (req,res)=>{
    try {
      const {Appointment_Date,Appointment_Time,Issue} = req.body;
      const update_appointment = {}
      if(Appointment_Date){update_appointment.Appointment_Date = Appointment_Date}
      if(Appointment_Time){update_appointment.Appointment_Time = Appointment_Time}
      if(Issue){update_appointment.Issue = Issue}
     
      //Find the user_appointment to be update & updated it.
      let response = await user_model.findByIdAndUpdate(req.params.id,{$set:update_appointment},{new:true})
      res.json(response)
    }catch (error) {
      console.error(error.message)
      res.status(500).send('Internal Server Error')
    }
  })

  module.exports = router