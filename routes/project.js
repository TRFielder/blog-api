const express = require('express');

const router = express.Router();
// const checkToken = require('../modules/token');

const projectController = require('../controllers/projectController');

// ------- PROJECT actions -------- //

// POST request to create a new project
router.post('/', projectController.createProject);

// GET request for a single project's details
router.get('/:id', projectController.project_get);

// PUT request to update an project
router.put('/:id', projectController.updateProject);

// DELETE request to remove an project
router.delete('/:id', projectController.deleteProject);

// PUT request to publish an project
router.put('/:id/publish', projectController.publishProject);

// PUT request to unpublish an project
router.put('/:id/unpublish', projectController.unpublishProject);

module.exports = router;
