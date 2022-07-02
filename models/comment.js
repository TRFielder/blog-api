const mongoose = require('mongoose');
require('./author');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  date: { type: Date, default: Date.now() },
  text: { type: String, required: true },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
