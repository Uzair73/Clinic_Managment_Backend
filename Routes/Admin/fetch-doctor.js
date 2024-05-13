const express = require('express');
const router = express.Router();
const doctor_list = require('../../Models/Admin/add-doctor'); // import admin-doctor- schema-model
const valid_admin_user = require('../../middleware/fetchuser');

//Router 4) Get all fetch doctors using get request: login required
router.get('/fetch-doctors', valid_admin_user, async (req, res) => {
    try {
        const doctors = await doctor_list.find(); // Find all doctors
        res.json(doctors);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
