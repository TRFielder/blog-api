const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthorSchema = new Schema({
  username: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Author', AuthorSchema);
