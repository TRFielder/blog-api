const { body } = require('express-validator');
const Article = require('../models/article');

exports.article_get = (req, res) => {
  Article.findById(req.params.id).exec((err, article) => {
    if (err) {
      res.json(err);
    }
    if (article === null) {
      return res.send('Article not found');
    }
    // Successful, so send the response JSON
    return res.json(article);
  });
};

exports.createArticle = [
  body('title').trim().isLength({ min: 1 }),
  body('text').trim().isLength({ min: 140 }),
];
