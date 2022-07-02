const { body, validationResult } = require('express-validator');
const Author = require('../models/author');

require('dotenv').config();

exports.author_detail_get = function getAuthor(req, res) {
  Author.findById(req.params.id).exec((err, author) => {
    if (err) {
      res.json(err);
    }
    // Successfull, so send the response JSON
    res.json(author);
  });
};

exports.createAuthor = [
  // Validate and sanitise inputs
  body('username').trim(),
  body('first_name').trim(),
  body('last_name').trim(),
  body('password', 'Password must be at least 8 characters').isLength({
    min: 8,
  }),

  (req, res, next) => {
    // Extract the validation errors from a result
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Return them as JSON
      return res.json({ errors: errors.array() });
    }
    // Create the new author and add them to the database
    const author = new Author({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    });
    author.save((err) => {
      if (err) {
        return next(err);
      }
    });
    // Send response payload containing the created author
    return res.json(author);
  },
];

exports.deleteAuthor = function (req, res, next) {
  Author.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }
    // User not found, inform in response
    if (result === null) {
      return res.send('User not found');
    }
    // Successfully deleted, confirm in response
    return res.send(`Removed user: ${result}\n`);
  });
};
