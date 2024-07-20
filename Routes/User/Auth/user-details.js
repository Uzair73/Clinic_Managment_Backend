const express= require('express'); // import express js
const user_model = require('../../../Models/User/user-auth'); // import user-schema model
const  router = express.Router(); // import router express to take a paths
var fetchuser = require('../../../middleware/fetchuser')

//Router 4)Get a user  details using post request: /api/auth/login :login required
router.post('/fetch-user', fetchuser,  async (req, res) => {
   // CORS
   res.setHeader("Access-Control-Allow-Origin", "*")
   res.setHeader("Access-Control-Allow-Credentials", "true");
   res.setHeader("Access-Control-Max-Age", "1800");
   res.setHeader("Access-Control-Allow-Headers", "content-type");
   res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );

  try {
    const userId = req.user.id;
    const user = await user_model.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

    module.exports = router