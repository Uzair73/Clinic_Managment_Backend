const express= require('express'); // import express js
const users = require('../../../Models/User/user-auth'); // import userschema model
const  router = express.Router(); // import router express to take a paths
const bcrypt = require('bcryptjs'); //import bcrypt js to protect password
var jwt = require('jsonwebtoken');  //import json web token
// var fetchusers = require('../middleware/fetchusers')
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.


//Router 2)Login a user using post request: /auth/login : no login required
router.post('/user-login',[
    // password must be at least 5 chars long
    body('Password','Password must be atleast 3 characters long').isLength({ min: 3 }),
    // username must be an email
    body('User_Name', 'User_Name must be atleast 3 characters long').isLength({ min: 3 }),
  ] , async (req,res) =>{
    let success = false;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  // IF there are errors, sending bad request nad errors
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const webtoken = '554$0@32'
  const {User_Name,Password} = req.body;
  try {
    let user = await users.findOne({User_Name})
    if(!user){
      return res.status(400).json('Please try to login using correct credentials')
    }
    const validPass = await bcrypt.compare(Password,user.Password)
    if(!validPass){
       return res.status(400).json("Please try to login using correct credentials")
    }
    const data = {
      user :{
        id: user.id
      }
    }
    console.log(data)
    success = true;
    const authtoken = jwt.sign(data,webtoken,{ noTimestamp:true, expiresIn: '24h'});
    res.json({success,authtoken})
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
  })

  module.exports = router;