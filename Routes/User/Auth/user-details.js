const express= require('express'); // import express js
const user_auth = require('../../../Models/User/user-auth'); // import user-schema model
const  router = express.Router(); // import router express to take a paths
var fetchuser = require('../../../middleware/fetchuser')

//Router 3)Get a user  details using post request: /api/auth/login :login required
router.post('/fetch-user', fetchuser,  async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await user_auth.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

    module.exports = router