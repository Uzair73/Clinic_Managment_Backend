const express= require('express'); // import express js
const user = require('../../Models/Users/User_Appointment'); // import user-schema model
const  router = express.Router(); // import router express to take a paths
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.
var fetchusers = require('../../middleware/fetchuser')




//Router 1) Create a user-appointment using post request:  login required
 router.post('/add-appointment', fetchusers,[
    // Appointment_Date must be at least 3 chars long
    body('Appointment_Date','Appointment_Date must be atleast 3 charaters long').isLength({ min: 3 }),

    // Appointment_Time must be at least 3 chars long
    body('Appointment_Time','Appointment_Time must be atleast 3 charaters long').isLength({ min: 3 }),

    // Issue must be written
    body('Issue',' Issue must be written atleast 5 characters long').isLength({ min: 5 }),

 ] , async (req,res) =>{
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        // IF there are errors, sending bad request
          if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
          }
           const {Appointment_Date,Appointment_Time,Issue,user_id} = req.body;
           const add_appointment = await new user ({
                Appointment_Date,Appointment_Time,Issue,user_id
             })
             const save_appointment = await add_appointment.save();
              res.json(save_appointment)
          }catch (error) {
           console.error(error.message)
           res.status(500).send('Internal Server Error')
         }
 })

 module.exports = router;
