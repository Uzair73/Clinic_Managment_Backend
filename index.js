//Import mongoose database
// var cors = require('cors') //Import cores using express
const connecttoMongoose = require('./db/db.js')
connecttoMongoose();
//import express

const express = require('express')
const app = express()
const bodyParser=require('body-parser');
// app.use(cors()) //use cores to fetch the data in the browser
const port = 5000
//req to server using json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//Routes(paths)

// Routes for Users
app.use('/auth',require('./Routes/User/Auth/user_signup.js'))  //user-signup
app.use('/auth',require('./Routes/User/Auth/user_login.js'))   //user-login
app.use('/user',require('./Routes/User/fetch_users.js'))       //fetch-user
app.use('/user',require('./Routes/User/update_user_info.js'))  //update-info of the user
app.use('/user',require('./Routes/User/user_appointment.js'))  //add-user-appointment
app.use('/user',require('./Routes/User/fetch_appointments.js')) //fetch-user-appointment
app.use('/user',require('./Routes/User/update_user_appointment.js')) //update-user-appointment
app.use('/user',require('./Routes/User/del_appointment.js'))   //delete-user-appointment

// Routes for Admin
app.use('/auth',require('./Routes/Admin/admin-signup.js'))  //admin-user-signup
app.use('/auth',require('./Routes/Admin/admin-login.js'))   //admin-user-login
app.use('/admin',require('./Routes/Admin/add_doctor.js'))   //add-doctor
app.use('/admin',require('./Routes/Admin/fetch_doctor.js')) //fetch-doctor
app.use('/admin',require('./Routes/Admin/update_doctor-info.js')) //update doctor-info


app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`)
})