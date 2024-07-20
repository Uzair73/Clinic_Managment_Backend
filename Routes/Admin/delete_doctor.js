const express= require('express');
const  router = express.Router();
const admin_model = require('../../Models/Admin/add-doctor'); // import admin-schema model
var valid_admin_user= require('../../middleware/fetchuser')

//Router 6)Delete the existing doctor if admin wants using delete request: login required
router.delete('/delete-doctor/:id',valid_admin_user,async (req,res)=>{
   // CORS
   res.setHeader("Access-Control-Allow-Origin", "*")
   res.setHeader("Access-Control-Allow-Credentials", "true");
   res.setHeader("Access-Control-Max-Age", "1800");
   res.setHeader("Access-Control-Allow-Headers", "content-type");
   res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    try {
      let doctor_list = await admin_model.findByIdAndDelete(req.params.id)
      res.json({"Doctor has been deleted" : "Successfully", Doctor: doctor_list})
    }catch (error) {
      console.error(error.message)
      res.status(500).send('Internal Server Error')
    }
  })
  module.exports = router