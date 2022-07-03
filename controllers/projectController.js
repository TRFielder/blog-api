const { body, validationResult } = require('express-validator');
const Project = require('../models/project');

exports.project_get = (req, res) => {
  Project.findById(req.params.id).exec((err, Project) => {
    if (err) {
      res.json(err);
    }
    if (Project === null) {
      return res.send('Project not found');
    }
    // Successful, so send the response JSON
    return res.json(Project);
  });
};

exports.createProject = [
  body('name').trim().isLength({ min: 1 }),
  body('text').trim().isLength({ min: 80 }),
  // Check techs used are from the allowed list
  body('techs.*').isIn([
    'react',
    'firebase',
    'git',
    'jest',
    'javascript',
    'typescript',
    'nextjs',
    'mongodb',
    'nodejs',
    'express',
    'pug',
  ]),

  (req, res, next) => {
    console.log(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    // Data is valid, create the new Project and save to database
    const project = new Project({
      name: req.body.title,
      techs: req.body.techs, // Change to req.authData._id when building CMS
      description: req.body.description,
      repository: req.body.repository,
      live_demo: req.body.live_demo,
    });
    console.log(project);
    project.save((err) => {
      if (err) {
        return next(err);
      }
    });
    // Send response payload containing the created Project
    return res.json(project);
  },
];

exports.deleteProject = (req, res, next) => {
  Project.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // Successfully deleted, send confirmation
    return res.send(`Deleted Project with ID: ${req.params.id}`);
  });
};

exports.updateProject = (req, res, next) => {
  Project.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      techs: req.body.techs,
      description: req.body.description,
      repository: req.body.repository,
      live_demo: req.body.live_demo,
    },
    (err) => {
      if (err) {
        return next(err);
      } // Successfully updated. send confirmation
      return res.send(`Updated Project with ID: ${req.params.id}`);
    }
  );
};

exports.publishProject = (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, { published: true }, (err) => {
    if (err) {
      return next(err);
    }
    // Successfully updated, send confirmation
    return res.send(`Published Project with ID: ${req.params.id}`);
  });
};

exports.unpublishProject = (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, { published: false }, (err) => {
    if (err) {
      return next(err);
    }
    // Successfully updated, send confirmation
    return res.send(`Unpublished Project with ID: ${req.params.id}`);
  });
};
