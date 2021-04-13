const express = require("express");
const {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getCreateEmployees,
} = require("../controllers/employeeController");

const Employee = require("../models/Employee");

const router = express.Router();

router.route("/").get(getEmployees);

router.route("/create").get(getCreateEmployees).post(createEmployee);

router
    .route("/:id")
    .get(getEmployee)
    .patch(updateEmployee)
    .delete(deleteEmployee);

module.exports = router;
