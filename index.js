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
app.use('/auth',require('./Routes/User/Auth/signup.js'))
app.use('/auth',require('./Routes/User/Auth/login.js'))
app.use('/auth',require('./Routes/User/Auth/user-details.js'))

app.use('/auth',require('./Routes/Admin/admin-user-signup.js'))
app.use('/auth',require('./Routes/Admin/admin-user-login.js'))


app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`)
})