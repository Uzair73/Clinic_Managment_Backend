const express= require('express'); // import express js
const users = require('../../Models/Users/User'); // import user-schema model
const  router = express.Router(); // import router express to take a paths
const bcrypt = require('bcryptjs'); //import bcrypt js to protect password
var fetchusers = require('../../middleware/fetchuser')



//Router 1)update a user info if user want using put request:  login required
 router.put('/update-info/:id',fetchusers , async (req,res) =>{
    
    try{
     const {First_Name,Last_Name,User_Name,Phone_Number,Password,Age,Gender} = req.body
     const newuser = {}
     if(First_Name){newuser.First_Name = First_Name}
     if(Last_Name){newuser.Last_Name = Last_Name}
     if(User_Name){newuser.User_Name = User_Name}
     if(Phone_Number){newuser.Phone_Number = Phone_Number}
     if(Password){
         const salt = await bcrypt.genSalt(10);
         newuser.Password = await bcrypt.hash(Password,salt);
     }
     if(Age){newuser.Age = Age}
     if(Gender){newuser.Gender = Gender}
     const user = await users.findByIdAndUpdate(req.params.id,{$set:newuser
        },{new:true})
     res.json({user})
    }
     catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
      }
 })

 module.exports = router;
