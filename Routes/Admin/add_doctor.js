const express= require('express'); // import express js
const admin = require('../../Models/Admins/Add_doctor'); // import admin-schema model
const  router = express.Router(); // import router express to take a paths
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.
var fetchusers = require('../../middleware/fetchuser')




//Router 1) Create a doctor using post request:
 router.post('/add-doctor', fetchusers,[
    // First_Name must be at least 3 chars long
    body('First_Name','First_Name must be atleast 3 charaters long').isLength({ min: 3 }),

    // Last_Name must be at least 3 chars long
    body('Last_Name','Last_Name must be atleast 3 charaters long').isLength({ min: 3 }),

    // Schedule must be written
    body('Schedule','Must be written').not().isEmpty(),

    // Status must be written
    body('Status','Must be written').not().isEmpty(),

 ] , async (req,res) =>{
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        // IF there are errors, sending bad request
          if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
          }
           const {First_Name,Last_Name,Schedule,Status,user_id} = req.body;
           const add_doctor = await new admin ({
               First_Name,Last_Name,Schedule,Status,user_id
              })
             const savedoctor = await add_doctor.save();
              res.json(savedoctor)
          }catch (error) {
           console.error(error.message)
           res.status(500).send('Internal Server Error')
         }
 })

 module.exports = router;
