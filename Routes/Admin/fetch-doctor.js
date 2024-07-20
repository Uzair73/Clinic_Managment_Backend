const express = require('express');
const router = express.Router();
const admin_model = require('../../Models/Admin/add-doctor'); // import admin-schema-model
const valid_admin_user = require('../../middleware/fetchuser');

//Router 4) Get all fetch doctors using get request: login required
router.get('/fetch-doctors', valid_admin_user, async (req, res) => {
     // CORS
     res.setHeader("Access-Control-Allow-Origin", "*")
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Max-Age", "1800");
     res.setHeader("Access-Control-Allow-Headers", "content-type");
     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    try {
        const doctors = await admin_model.find(); // Find all doctors
        res.json(doctors);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
