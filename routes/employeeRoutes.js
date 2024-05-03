const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// GET /employees
router.get('/getEmployees', employeeController.get_employees);

// POST /employee
router.post('/addEmployee', employeeController.add_employee);

// PUT /employee
router.put('/updateEmployee/:id', employeeController.update_employee);

// DELETE/employee
router.delete('/deleteEmployee/:id', employeeController.delete_employee);

module.exports = router;