const express= require('express'); // import express js
const user_model = require('../../../Models/User/user-auth'); // import user-schema model
const img_schema = require('../../../Models/User/image'); // import img-schema model
const  router = express.Router(); // import router express to take a paths
const bcrypt = require('bcryptjs'); //import bcrypt js to protect password
var jwt = require('jsonwebtoken');  //import json web token
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.
var valid_user = require('../../../middleware/fetchuser')
const dotenv = require('dotenv');
dotenv.config();


//Router 2)Login a user using post request:
router.post('/user-login',[
    // Password must be at least 5 chars long
    body('Password','Password must be atleast 3 characters long').isLength({ min: 3 }),
    // Username must be atleast 3 chars long
    body('User_Name', 'User_Name must be atleast 3 characters long').isLength({ min: 3 }),
  ] , async (req,res) =>{
res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    let success = false;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  // IF there are errors, sending bad request and errors
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const webtoken = process.env.TOKEN_SECREAT //Token secreat
  const {User_Name,Password} = req.body;
  try {
    let user = await user_model.findOne({User_Name})
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
