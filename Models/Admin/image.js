const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    filename: String,
    path: String,
    mimetype: String
  });
const imagemodel = mongoose.model('Admin_Doctor_Image',ImageSchema)
module.exports = imagemodel;