const express = require('express');

const router = express.Router();
// const checkToken = require('../modules/token');

const authorController = require('../controllers/authorController');

// ------- AUTHOR actions -------- //

// POST request to create a new author
router.post('/', authorController.createAuthor);

// GET request for a single author's details
router.get('/:id', authorController.author_detail_get);

// PUT request to update an author
router.put('/:id', (req, res) => {
  res.send('NOT IMPLEMENTED: Author PUT');
});

// DELETE request to remove an author
router.delete('/:id', authorController.deleteAuthor);

// POST request to log in as an author
router.post('/login', authorController.authorLogin);

module.exports = router;
