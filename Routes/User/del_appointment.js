const express = require('express');
const user = require('../../Models/Users/User_Appointment');
const router = express.Router();
var fetchusers = require('../../middleware/fetchuser')

router.delete('/delete-appointment/:id', fetchusers, async (req, res) => {
    try {
        let del_appointment = await user.findById(req.params.id);
        if (!del_appointment) {
            return res.status(404).send('Not found');
        }
        // Allow deletion only if the user has its own appointments
        if (del_appointment.user && del_appointment.user.toString() !== req.body._id) {
            return res.status(401).send('Not Allowed');
        }
        del_appointment = await user.findByIdAndDelete(req.params.id);
        res.json({ "Appointment has been cancaled and deleted": "Successfully", del_appointment: del_appointment });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
