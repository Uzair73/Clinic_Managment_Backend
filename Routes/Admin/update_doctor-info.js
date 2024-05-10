const express= require('express'); // import express js
const admin = require('../../Models/Admins/Add_doctor'); // import admin-schema model
const  router = express.Router(); // import router express to take a paths
var fetchusers = require('../../middleware/fetchuser')



//Router 1)update a doctor-info if admin want. -- using put request:
 router.put('/update-doctor-info/:id',fetchusers , async (req,res) =>{
    
    try{
     const {First_Name,Last_Name,Schedule,Status} = req.body
     const new_doctor = {}
     if(First_Name){new_doctor.First_Name = First_Name}
     if(Last_Name){new_doctor.Last_Name = Last_Name}
     if(Schedule){new_doctor.User_Name = Schedule}
     if(Status){new_doctor.Phone_Number = Status}

     const add_doc = await admin.findByIdAndUpdate(req.params.id,{$set:new_doctor
        },{new:true})
     res.json({add_doc})
    }
     catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
      }
 })

 module.exports = router;
