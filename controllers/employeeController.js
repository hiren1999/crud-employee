const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Employee = require("../models/Employee");

// @desc      Create New employee
// @route     POST /api/v1/employees
// @access    Private
exports.createEmployee = asyncHandler(async (req, res, next) => {
  // validate request
  if (!req.body) {
    return next(new ErrorResponse("Contain will be Empty", 400));
  }

  // // New Employee create
  // const employee = new Employee({
  //   username: req.body.username,
  //   firstname: req.body.firstname,
  //   lastname: req.body.lastname,
  //   email: req.body.email,
  //   mobileno: req.body.mobileno,
  //   profilephoto: req.body.profilephoto,
  //   gender: req.body.gender,
  //   dob: req.body.dob,
  //   hobbies: req.body.hobbies,
  // });

  const employee = await Employee.create(req.body);

  res.status(201).json({
    success: true,
    data: employee,
  });
});

// @desc      Get all employees
// @route     GET /api/v1/employees
// @access    Public
exports.getEmployees = asyncHandler(async (req, res, next) => {
  const employees = await Employee.find();

  res
    .status(200)
    .json({ success: true, count: employees.length, data: employees });
});

// @desc      Get Single employee
// @route     GET /api/v1/employees/:id
// @access    Public
exports.getEmployee = asyncHandler(async (req, res, next) => {
  const employees = await Employee.findById(req.params.id);

  if (!employees) {
    return next(
      new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: employees });
});

// @desc      Update Employee
// @route     PATCH /api/v1/employees/:id
// @access    Private
exports.updateEmployee = asyncHandler(async (req, res, next) => {
  let employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
    );
  }

  employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: employee });
});

// @desc      Delete employee
// @route     DELETE /api/v1/employees/:id
// @access    Private
exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  let employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
    );
  }

  await employee.remove();

  res.status(200).json({ success: true, data: {} });
});
