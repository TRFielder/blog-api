const mongoose = require('mongoose');
require('./comment');
require('./author');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author' }, // Reference to the article author
  date: { type: Date, default: Date.now() },
  text: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Reference to the comments on the article
  published: { type: Boolean, default: false },
});

ArticleSchema.virtual('date_formatted').get(() => {
  DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_FULL);
});

module.exports = mongoose.model('Article', ArticleSchema);
