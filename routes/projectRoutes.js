const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET /projects
router.get('/getProjects', projectController.get_projects);

// POST /project
router.post('/addProject', projectController.add_project);

// PUT/project
router.put('/updateProject/:id', projectController.update_project)

// DELETE/project
router.delete('/deleteProject/:id', projectController.delete_project)

router.get('/getUniqueProjectByName/:project_name', projectController.get_project_by_name);

module.exports = router;