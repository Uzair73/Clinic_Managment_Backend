const express= require('express'); // import express js
const admin_model = require('../../Models/Admin/admin-auth'); // import admin-schema model
const doc_img_model = require('../../Models/Admin/image')
const  router = express.Router(); // import router express to take a paths
const bcrypt = require('bcryptjs'); //import bcrypt js to protect password
var jwt = require('jsonwebtoken');  //import json web token
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.
const dotenv = require('dotenv');
dotenv.config();

//Router 2)Login a admin-user using post request
router.post('/login',[
    // Password must be at least 5 chars long
    body('Password','Password must be atleast 5 chara long').isLength({ min: 5 }),
    // Enter a valid email
    body('Email', 'Enter a valid Email').isEmail(),
  ] , async (req,res) =>{
     // CORS
     res.setHeader("Access-Control-Allow-Origin", "*")
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Max-Age", "1800");
     res.setHeader("Access-Control-Allow-Headers", "content-type");
     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    let success = false;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  // IF there are errors, sending bad request nad errors
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const webtoken = process.env.TOKEN_SECREAT //Token secreat
  const {Email,Password} = req.body;
  try {
    let user = await admin_model.findOne({Email})
    if(!user){
      return res.status(400).json('Please try to login using correct credentials')
    }
    const validPass = await bcrypt.compare(Password,user.Password)
    if(!validPass){
       return res.status(400).json("Please try to login using correct credentials")
    }

   const data = {
     admin_user: {
       id: user.id,
     }
   };
    success = true;
    const authtoken = jwt.sign(data,webtoken,{ noTimestamp:true, expiresIn: '24h'});
    res.json({success,authtoken})
  }
  catch (error) {
    res.status(500).send('Internal Server Error')
  }
  })

 module.exports = router;
  