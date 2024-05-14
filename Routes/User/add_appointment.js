const express= require('express'); // import express js
const appointment_model = require('../../Models/User/appointment'); // import user-appointment-schema model
const  router = express.Router(); // import router express to take a paths
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.
var valid_user = require('../../middleware/fetchuser')

//Router 5)Add appointment if user wants : login required
router.post('/add-appointment',valid_user,[
    // Appointment_Date must be at least 5 chars long
    body('Appointment_Date','Appointment_Date must be atleast 5 charaters long').isLength({ min: 5 }),
    // Appointment_Time must be at least 5 chars long
    body('Appointment_Time','Appointment_Time must be atleast 3 charaters long').isLength({ min: 3 }),
    // Issue must be atleast 10 charaters long
    body('Issue','Issue must be atleast 10 charaters long').isLength({ min: 10 })
], async (req,res)=>{
      try {
 // Finds the validation errors in this request and wraps them in an object with handy functions
 const errors = validationResult(req);
 // IF there are errors, sending bad request
   if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
   }
    const {Appointment_Date,Appointment_Time,Issue,user_id} = req.body;
    const appointment = await new appointment_model ({
        Appointment_Date,Appointment_Time,Issue,user_id
       })
      const save_appointment = await appointment.save();
       res.json(save_appointment)
   }catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router;