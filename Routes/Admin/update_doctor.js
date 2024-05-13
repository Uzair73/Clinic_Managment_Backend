const express= require('express');
const  router = express.Router();
const doctor = require('../../Models/Admin/add-doctor'); // import admin-doctor schema model
var valid_admin_user= require('../../middleware/fetchuser')

//Router 5)Update & create new doctor-list if admin wants using put request: login required
router.put('/update-doctor-info/:id',valid_admin_user,async (req,res)=>{
    try {
      const {First_Name,Last_Name,Schedule,Status} = req.body;
      const update_doctor = {}
      if(First_Name){update_doctor.First_Name = First_Name}
      if(Last_Name){update_doctor.Last_Name = Last_Name}
      if(Schedule){update_doctor.Schedule = Schedule}
      if(Status){update_doctor.Status = Status}
     
      //Find the doctor to be update & updated it.
      let update_doc = await doctor.findByIdAndUpdate(req.params.id,{$set:update_doctor},{new:true})
      res.json(update_doc)
    }catch (error) {
      console.error(error.message)
      res.status(500).send('Internal Server Error')
    }
  })

  module.exports = router