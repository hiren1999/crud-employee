const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Employee = require("../models/Employee");
const isEmpty = require("../validations/isEmpty");
const validateRegisterInput = require("../validations/employee");

// @desc      Create New employee
// @route     POST /api/v1/employees/create
// @access    Private
exports.createEmployee = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { errors, isValid } = await validateRegisterInput(req.body);

    // Check here Username isExists or not
    Employee.findOne({ username: req.body.username })
        .then((check_username) => {
            if (check_username && isEmpty(errors.username)) {
                errors.username = "Username can be Already Exists";
            }
        })
        .catch((err) => console.log(err));

    // Check here Email isExists or not
    Employee.findOne({ email: req.body.email })
        .then((check_email) => {
            if (check_email && isEmpty(errors.email)) {
                errors.email = "Email can be Already Exists";
            }
        })
        .catch((err) => console.log(err));

    // Check here MobileNO isExists or Not
    Employee.findOne({ mobileno: req.body.mobileno })
        .then((check_mobileno) => {
            if (check_mobileno && isEmpty(errors.mobileno)) {
                errors.mobileno = "Mobile NO can be Already Exists";
            }
        })
        .catch((err) => console.log(err));

    if (!isValid || !isEmpty(errors)) {
        var response = {};
        response.error = true;
        response.message = "All Fields are Required";
        response.errors = errors;
        // return res.status(422).json(response);
        res.render("employee/create", {
            errors: errors,
            req: req,
        });
    } else {
        const employee = await Employee.create(req.body);

        // res.status(201).json({
        //     success: true,
        //     data: employee,
        // });

        res.render("employees", {
            errors: errors,
            req: req,
            data: employee,
        });
    }
});

// @desc      Get all employees
// @route     GET /api/v1/employees/create
// @access    Public
exports.getCreateEmployees = asyncHandler(async (req, res, next) => {
    const employees = await Employee.find();

    res.render("employee/create", {
        req: req,
        data: employees,
    });
});

// @desc      Get all employees
// @route     GET /api/v1/employees
// @access    Public
exports.getEmployees = asyncHandler(async (req, res, next) => {
    const employees = await Employee.find();

    // res.status(200).json({
    //     success: true,
    //     count: employees.length,
    //     data: employees,
    // });
    res.render("index", {
        req: req,
        response: employees,
    });
});

// @desc      Get Single employee
// @route     GET /api/v1/employees/:id
// @access    Public
exports.getEmployee = asyncHandler(async (req, res, next) => {
    const employees = await Employee.findById(req.params.id);

    if (!employees) {
        return next(
            new ErrorResponse(
                `Employee not found with id of ${req.params.id}`,
                404
            )
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
            new ErrorResponse(
                `Employee not found with id of ${req.params.id}`,
                404
            )
        );
    }

    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // res.status(200).json({ success: true, data: employee });
    res.render("employee/edit", {
        req: req,
        response: employee,
    });
});

// @desc      Delete employee
// @route     DELETE /api/v1/employees/:id
// @access    Private
exports.deleteEmployee = asyncHandler(async (req, res, next) => {
    let employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(
            new ErrorResponse(
                `Employee not found with id of ${req.params.id}`,
                404
            )
        );
    }

    await employee.remove();

    res.status(200).json({ success: true, data: {} });
});
