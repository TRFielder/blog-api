const express = require('express');

const router = express.Router();
// const checkToken = require('../modules/token');

const articleController = require('../controllers/articleController');

// ------- ARTICLE actions -------- //

// POST request to create a new article
router.post('/', articleController.createArticle);

// GET request for a single article's details
router.get('/:id', articleController.article_get);

// PUT request to update an article
router.put('/:id', articleController.updateArticle);

// DELETE request to remove an article
router.delete('/:id', articleController.deleteArticle);

// PUT request to publish an article
router.put('/:id/publish', articleController.publishArticle);

// PUT request to unpublish an article
router.put('/:id/unpublish', articleController.unpublishArticle);

module.exports = router;
