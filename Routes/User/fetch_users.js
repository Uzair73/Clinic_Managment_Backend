const express= require('express');
const  router = express.Router();
const users = require('../../Models/Users/User'); // import user-schema model
var Fetch_users= require('../../middleware/fetchuser')

//Router 1)Get all fetch users using get request: --login required
router.get('/fetch-user', Fetch_users,  async (req, res) => {

    try {
      const userId = req.user.id;
      console.log(userId)
      const user = await users.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router