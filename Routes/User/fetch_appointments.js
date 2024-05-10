const express= require('express');
const  router = express.Router();
const user_appointment = require('../../Models/Users/User_Appointment'); // import user-schema model
var Fetch_users= require('../../middleware/fetchuser')

//Router 1)Get all fetch appointments of user using get request:  --login required
router.get('/fetch-appointments', Fetch_users,  async (req, res) => {

    try {
      const userId = req.user.id;
      console.log(userId)
      const show_appointment = await user_appointment.find()
      res.send(show_appointment)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router