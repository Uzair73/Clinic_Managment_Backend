const express= require('express');
const  router = express.Router();
const user_model = require('../../../Models/User/user-auth'); // import user-auth schema model
var valid_user= require('../../../middleware/fetchuser')
const bcrypt = require('bcryptjs'); //import bcrypt js to protect password

//Router 3)Update user-information if user wants using put request: login required
router.put('/update-info/:id',valid_user,async (req,res)=>{
    try {
      const salt = await bcrypt.genSalt(10); //Generating a password hash
      const secpass = await bcrypt.hash(req.body.Password,salt)
      const {First_Name,Last_Name,User_Name,Phone_Number,Password,Age,Gender} = req.body;
      const update_info = {}
      if(First_Name){update_info.First_Name = First_Name}
      if(Last_Name){update_info.Last_Name = Last_Name}
      if(User_Name){update_info.User_Name = User_Name}
      if(Phone_Number){update_info.Phone_Number = Phone_Number}
      if(secpass.Password){update_info.secpass.Password = Password}
      if(Age){update_info.Age = Age}
      if(Gender){update_info.Gender = Gender}
     
      //Find the doctor to be update & updated it.
      let update_user_info = await user_model.findByIdAndUpdate(req.params.id,{$set:update_info},{new:true})
      res.json(update_user_info)
    }catch (error) {
      console.error(error.message)
      res.status(500).send('Internal Server Error')
    }
  })

  module.exports = router