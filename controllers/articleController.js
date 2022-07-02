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
    console.log(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    // Data is valid, create the new article and save to database
    const article = new Article({
      title: req.body.title,
      author: req.body.author, // Change to req.authData._id when building CMS
      text: req.body.text,
    });
    console.log(article);
    article.save((err) => {
      if (err) {
        return next(err);
      }
    });
    // Send response payload containing the created article
    return res.json(article);
  },
];

exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // Successfully deleted, send confirmation
    return res.send(`Deleted article with ID: ${req.params.id}`);
  });
};

exports.updateArticle = (req, res, next) => {
  Article.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      text: req.body.text,
    },
    (err) => {
      if (err) {
        return next(err);
      } // Successfully updated. send confirmation
      return res.send(`Updated article with ID: ${req.params.id}`);
    }
  );
};

exports.publishArticle = (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, { published: true }, (err) => {
    if (err) {
      return next(err);
    }
    // Successfully updated, send confirmation
    return res.send(`Published article with ID: ${req.params.id}`);
  });
};

exports.unpublishArticle = (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, { published: false }, (err) => {
    if (err) {
      return next(err);
    }
    // Successfully updated, send confirmation
    return res.send(`Unpublished article with ID: ${req.params.id}`);
  });
};
