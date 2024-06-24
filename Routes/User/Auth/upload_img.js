const express = require('express'); // import express js
const img_schema = require('../../../Models/User/image'); // import img-schema model
const router = express.Router(); // import router express to take a paths
var valid_user = require('../../../middleware/fetchuser')


const multer = require('multer'); //For file or img uploding


// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'user_profile_img/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  // console.log(upload)
  
 // Endpoint for uploading images
router.post('/upload-img', upload.single('image'), valid_user,async (req, res) => {
    try {
      const newImage = new img_schema({
        user_id: req.user._id,
        filename: req.file.originalname,
        path: req.file.path,
        mimetype: req.file.mimetype
      });
      await newImage.save();
      res.send('Image uploaded successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


module.exports = router;
