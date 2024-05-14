const express = require('express');
const user_model = require('../../Models/User/appointment');
const router = express.Router();
var valid_user = require('../../middleware/fetchuser')


//Router 7)Delete user_appointment if user want using delete request: login required
router.delete('/delete-appointment/:id', valid_user, async (req, res) => {
    try {
        let del_appointment = await user_model.findById(req.params.id);
        if (!del_appointment) {
            return res.status(404).send('Not found');
        }
        // Allow deletion only if the user has its own appointments
        if (del_appointment.user && del_appointment.user.toString() !== req.body._id) {
            return res.status(401).send('Not Allowed');
        }
        del_appointment = await user_model.findByIdAndDelete(req.params.id);
        res.json({ "Appointment has been canceled and deleted": "Successfully", del_appointment: del_appointment });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
