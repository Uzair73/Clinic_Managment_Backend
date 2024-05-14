const express = require('express'); // import express js
const img_schema = require('../../Models/Admin//image'); // import img-schema model
const router = express.Router(); // import router express to take a paths
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.
var valid_admin_user = require('../../middleware/fetchuser')


const multer = require('multer'); //For file or img uploding


// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  // console.log(upload)
  
 // Endpoint for uploading images
router.post('/upload-img', upload.single('image'), valid_admin_user,async (req, res) => {
    try {
      const newImage = new img_schema({
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
