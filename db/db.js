const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const dotenv = require('dotenv');
dotenv.config();
const mongoURI = process.env.MONGODB_URI


const connectToMongo = async () => {
      mongoose.connect(mongoURI).then(() => {
        console.log("Connected to Mongodb Successfully!");
      }).catch((error) => {
        console.log(error)
      })
    };
  module.exports = connectToMongo; 