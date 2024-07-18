const express = require('express');
const router = express.Router();
const admin_model = require('../../Models/Admin/add-doctor');
const valid_admin_user = require('../../middleware/fetchuser');
const multer = require('multer');

const upload = multer();

router.put('/update-doctor-info/:id', valid_admin_user, upload.none(), async (req, res) => {
  try {
    const { First_Name, Last_Name, Schedule, Status } = req.body;
    const update_doctor = {};
    
    if (First_Name) { update_doctor.First_Name = First_Name; }
    if (Last_Name) { update_doctor.Last_Name = Last_Name; }
    if (Schedule) { update_doctor.Schedule = Schedule; }
    if (Status) { update_doctor.Status = Status; }
    
    let update_doc = await admin_model.findByIdAndUpdate(req.params.id, { $set: update_doctor }, { new: true });
    res.json(update_doc);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;