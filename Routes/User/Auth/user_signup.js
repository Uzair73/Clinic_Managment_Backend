const express= require('express'); // import express js
const users = require('../../../Models/Users/User'); // import user-schema model
const  router = express.Router(); // import router express to take a paths
const bcrypt = require('bcryptjs'); //import bcrypt js to protect password
var jwt = require('jsonwebtoken');  //import json web token
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.



//Router 1) Create a user using post request:
 router.post('/signup',[
    // First_Name must be at least 3 chars long
    body('First_Name','First_Name must be atleast 3 charaters long').isLength({ min: 3 }),

    // Last_Name must be at least 3 chars long
    body('Last_Name','Password must be atleast 3 charaters long').isLength({ min: 3 }),

    // User_Name must be at least 3 chars long
    body('User_Name','User_Name must be 3 characters long').isLength({ min: 3 }),

    // Phone_Number must be at least 5 chars long
    body('Phone_Number','Phone_Number must be min 5').isLength({ min: 5 }),

    // Password must be at least 3 chars long
    body('Password','Password must be atleast 3 charaters long').isLength({ min: 3 }),

    // Age must be written
    body('Age','Age must be written').not().isEmpty(),
    
    // Gender must be written
    body('Gender','Gender must be written').not().isEmpty()



 ] , async (req,res) =>{
     let success = false;
 // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   // IF there are errors, sending bad request
     if (!errors.isEmpty()) {
     return res.status(400).json({success, errors: errors.array() });
 }
 try {
   //To check the user that this email alreday exists or not.
 let user = await users.findOne({User_Name:req.body.User_Name});
 if (user) { //if users already exits sending bad request
   return res.status(400).json({success,error: "Sorry this User_Name already exists"});
 }
 // addign a bcrypt salt to protect users passwords
 const webtoken = '554$0@32'
 const salt = await bcrypt.genSalt(10); //Generating a password hash
 const secpass = await bcrypt.hash(req.body.Password,salt)
  user = await users.create({
   First_Name: req.body.First_Name,
   Last_Name: req.body.Last_Name,
   User_Name: req.body.User_Name,
   Phone_Number: req.body.Phone_Number,
   Password: secpass,
   Age: req.body.Age,
   Gender: req.body.Gender,
 })
 const data = {
   user :{
     id: user.id
   }
 } 
 console.log(data)
 const authtoken = jwt.sign(data,webtoken,{ noTimestamp:true, expiresIn: '24h'});
 success = true;
 res.json({success,authtoken})
 } catch (error) {
   console.error(error.message)
   res.status(500).send('Internal Server Error')
 }
 })

 module.exports = router;
