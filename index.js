//Import mongoose database
var cors = require('cors') //Import cores using express
const connecttoMongoose = require('./db/db.js')
connecttoMongoose();
//import express

const express = require('express')
const app = express()
const bodyParser=require('body-parser');
app.use(cors()) //use cores to fetch the data in the browser
const port = 5000
//req to server using json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//Routes(paths)

//User endpoint middleware
app.use('/auth',require('./Routes/User/Auth/signup.js'))
app.use('/auth',require('./Routes/User/Auth/login.js'))
app.use('/auth',require('./Routes/User/Auth/user-details.js'))
app.use('/auth',require('./Routes/User/Auth/update-user-info.js'))
app.use('/user',require('./Routes/User/add_appointment.js'))
app.use('/user',require('./Routes/User/fetch_appointment.js'))
app.use('/user',require('./Routes/User/update_appointment.js'))
app.use('/user',require('./Routes/User/del_appointment.js'))
app.use('/user',require('./Routes/User/Auth/upload_img.js'))
app.use('/user',require('./Routes/User/Auth/get_img.js'))

//Admin endpoint middleware
app.use('/admin-auth',require('./Routes/Admin/admin-user-signup.js')) 
app.use('/admin-auth',require('./Routes/Admin/admin-user-login.js'))
app.use('/admin',require('./Routes/Admin/add-doctor.js'))
app.use('/admin',require('./Routes/Admin/fetch-doctor.js'))
app.use('/admin',require('./Routes/Admin/update_doctor.js'))
app.use('/admin',require('./Routes/Admin/delete_doctor.js'))
// app.use('/admin',require('./Routes/Admin/img_upload.js'))
app.use('/admin',require('./Routes/Admin/get_img.js'))


app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`)
})