const express = require('express'); // import express js
const router = express.Router(); // import router express to take a paths
const img_schema = require('../../Models/Admin/image'); // import img-schema model
// var valid_user = require('../../../middleware/fetchuser')
const path = require('path'); // import path module to handle file paths


// Endpoint for retrieving images
router.get('/image/:id', async (req, res) => {
    try {
        const image = await img_schema.findById(req.params.id);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        const absolutePath = path.resolve(image.path);
        console.log(absolutePath);
        res.status(200).sendFile(absolutePath);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
  });
  
module.exports = router;