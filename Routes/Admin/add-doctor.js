const express = require('express'); // import express js
const admin_model = require('../../Models/Admin/add-doctor'); // import admin-schema model
const router = express.Router(); // import router express to take a paths
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.
var valid_admin_user = require('../../middleware/fetchuser')

//Router 3)Add doctor if admin wants : login required
router.post('/add-doctor', valid_admin_user, [
  // First_Name must be at least 5 chars long
  body('First_Name', 'First_Name must be atleast 5 charaters long').isLength({ min: 5 }),
  // Last_Name must be at least 3 chars long
  body('Last_Name', 'Last_Name must be atleast 3 charaters long').isLength({ min: 3 }),
  // Schedule must be written
  body('Schedule', 'Schedule must be written').not().isEmpty(),
  // Status must be written
  body('Status', 'Status must be written').not().isEmpty(),
], async (req, res) => {
  try {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    // IF there are errors, sending bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { First_Name, Last_Name, Schedule, Status, user_id } = req.body;
    const doctor = await new admin_model({
      First_Name, Last_Name, Schedule, Status, user_id
    })
    const savedoctor = await doctor.save();
    res.json(savedoctor)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router;