const express= require('express'); // import express js
const admin_model = require('../../Models/Admin/admin-auth'); // import admin-schema model
const doc_img_model = require('../../Models/Admin/image')
const  router = express.Router(); // import router express to take a paths
const bcrypt = require('bcryptjs'); //import bcrypt js to protect password
var jwt = require('jsonwebtoken');  //import json web token
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.

//Router 2)Login a admin-user using post request
router.post('/login',[
    // Password must be at least 5 chars long
    body('Password','Password must be atleast 5 chara long').isLength({ min: 5 }),
    // Enter a valid email
    body('Email', 'Enter a valid Email').isEmail(),
  ] , async (req,res) =>{
    let success = false;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  // IF there are errors, sending bad request nad errors
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const webtoken = '554$0@32'
  const {Email,Password,filename} = req.body;
  try {
    let user = await admin_model.findOne({Email})
    // let doc_img = await doc_img_model.findOne(filename)
    if(!user){
      return res.status(400).json('Please try to login using correct credentials')
    }
    const validPass = await bcrypt.compare(Password,user.Password)
    if(!validPass){
       return res.status(400).json("Please try to login using correct credentials")
    }
   // Retrieve all document image IDs
   let doc_imgs = await doc_img_model.find({}); // Assuming you want all images, adjust query as necessary
   let doc_img_ids = doc_imgs.map(doc => doc._id); // Extracting the IDs

   const data = {
     admin_user: {
       id: user.id,
       doc_img_ids: doc_img_ids,
     }
   };
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
  