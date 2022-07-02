const { body, validationResult } = require('express-validator');
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

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    // Data is valid, create the new article and save to database
    const article = new Article({
      title: req.body.title,
      author: req.authData._id,
      text: req.body.text,
    });
    article.save((err) => {
      if (err) {
        return next(err);
      }
    });
    // Send response payload containing the created article
    return res.json(article);
  },
];
