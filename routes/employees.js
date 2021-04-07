const express = require("express");
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const Employee = require("../models/Employee");

const router = express.Router();

router.route("/").get(getEmployees).post(createEmployee);

router
  .route("/:id")
  .get(getEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
