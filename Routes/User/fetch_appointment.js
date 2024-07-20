const express = require('express');
const router = express.Router();
const appointment_model = require('../../Models/User/appointment'); // import appointment- schema-model
const valid_user = require('../../middleware/fetchuser');

//Router 6) Get all fetch appointments using get request: login required
router.get('/fetch-appointments', valid_user, async (req, res) => {
     // CORS
     res.setHeader("Access-Control-Allow-Origin", "*")
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Max-Age", "1800");
     res.setHeader("Access-Control-Allow-Headers", "content-type");
     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    try {
        const appointment = await appointment_model.find(); // Find all appointments of the users
        res.json(appointment);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
