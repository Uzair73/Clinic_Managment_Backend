const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user-authentications',
    },
    filename: String,
    path: String,
    mimetype: String
  });
const imagemodel = mongoose.model('User_Profile_Images',ImageSchema)
module.exports = imagemodel;