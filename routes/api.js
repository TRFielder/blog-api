const express = require('express');

const router = express.Router();
const checkToken = require('../modules/token');

const authorController = require('../controllers/authorController');
const articleController = require('../controllers/articleController');

/* GET api listing. */
router.get('/', (req, res, next) => {
  res.send('API route');
});

// ------- AUTHOR actions -------- //

// POST request to create a new author
router.post('/author', authorController.createAuthor);

// GET request for a single author's details
router.get('/author/:id', authorController.author_detail_get);

// PUT request to update an author
router.put('/author/:id', checkToken, (req, res) => {
  res.send('NOT IMPLEMENTED: Author PUT');
});

// DELETE request to remove an author
router.delete('/author/:id', checkToken, authorController.deleteAuthor);

// POST request to log in as an author
router.post('/login', authorController.authorLogin);

// ------- ARTICLE actions -------- //

// POST request to create a new article
router.post('/article', checkToken, (req, res) => {
  res.send('NOT IMPLEMENTED: Article GET');
});

// GET request for a single article's details
router.get('/article/:id', articleController.article_get);

// PUT request to update an article
router.put('/article/:id', checkToken, (req, res) => {
  res.send('NOT IMPLEMENTED: Article update PUT');
});

// DELETE request to remove an article
router.delete('/article/:id', checkToken, (req, res) => {
  res.send('NOT IMPLEMENTED: Article DELETE');
});

// PUT request to publish an article
router.put('/article/:id/publish', checkToken, (req, res) => {
  res.send('NOT IMPLEMENTED: Article Publish PUT');
});

// PUT request to unpublish an article
router.put('/article/:id/unpublish', checkToken, (req, res) => {
  res.send('NOT IMPLEMENTED: Article unpublish PUT');
});

module.exports = router;
