const express = require('express');

const router = express.Router();

const authorController = require('../controllers/authorController');

/* GET api listing. */
router.get('/', (req, res, next) => {
  res.send('API route');
});

// ------- AUTHOR CRUD actions -------- //

// GET request for a single author's details
router.get('/author/:id', authorController.author_detail_get);

// POST request to create a new author
router.post('/author', authorController.createAuthor);

// DELETE request to remove an author
router.delete('/author/:id', authorController.deleteAuthor);

module.exports = router;
