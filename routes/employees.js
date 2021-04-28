const express = require('express');
const {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getCreateEmployees,
    getEmployeesList,
    postEmployeesList,
} = require('../controllers/employeeController');

const Employee = require('../models/Employee');

const router = express.Router();

router.route('/').get(getEmployees);

router.route('/create').get(getCreateEmployees).post(createEmployee);

router.route('/list').get(getEmployeesList).post(postEmployeesList);

router.route('/edit/:id').get(getEmployee).patch(updateEmployee);

router.route('/:id').delete(deleteEmployee);

module.exports = router;
