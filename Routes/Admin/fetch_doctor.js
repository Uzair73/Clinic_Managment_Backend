const express= require('express');
const  router = express.Router();
const admin = require('../../Models/Admins/Add_doctor'); // import admin-schema model
var Fetch_users= require('../../middleware/fetchuser')  //To get the token if not user will not access.

//Router 1)Get all fetch doctors using get request: login required
router.get('/fetch-doctors', Fetch_users,  async (req, res) => {

    try {
      const userId = req.user.id;
      console.log(userId)
      const show_doctor = await admin.find()
      res.send(show_doctor)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router