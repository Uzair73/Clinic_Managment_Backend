const express = require('express');
const mongoose = require('mongoose'); // import mongoose for ObjectId
const admin_model = require('../../Models/Admin/add-doctor'); // import admin-schema model
const img_schema = require('../../Models/Admin/image'); // import img-schema model
const router = express.Router();
const { body, validationResult } = require('express-validator'); // import express validator
var valid_admin_user = require('../../middleware/fetchuser'); // import middleware for authentication

const multer = require('multer'); // For file or image uploading

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'doctor_img/'); // destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // original filename
  }
});
const upload = multer({ storage: storage });

// Combined Route: Add doctor and upload image
router.post('/add-doctor', valid_admin_user, upload.single('image'), [
  body('First_Name', 'First_Name must be at least 5 characters long').isLength({ min: 5 }),
  body('Last_Name', 'Last_Name must be at least 3 characters long').isLength({ min: 3 }),
  body('Schedule', 'Schedule must be written').not().isEmpty(),
  body('Status', 'Status must be written').not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { First_Name, Last_Name, Schedule, Status } = req.body;

    let newImageData;
    if (req.file) {
      const newImage = new img_schema({
        filename: req.file.originalname,
        path: req.file.path,
        mimetype: req.file.mimetype
      });
      newImageData = await newImage.save();
    }

    const doctor = new admin_model({
      First_Name,
      Last_Name,
      Schedule,
      Status,
      Image: newImageData ? new mongoose.Types.ObjectId(newImageData._id) : null // Ensure correct ObjectId usage
    });

    const savedoctor = await doctor.save();
    res.json(savedoctor);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
