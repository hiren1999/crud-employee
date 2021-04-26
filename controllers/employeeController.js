const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Employee = require('../models/Employee');
const isEmpty = require('../validations/isEmpty');
const validateRegisterInput = require('../validations/employee');
const mime = require('mime');
const fse = require('fs-extra');
const fs = require('fs');

// @desc      Create New employee
// @route     POST /employees/create
// @access    Private
exports.createEmployee = async (req, res, next) => {
    try {
        // console.log(req.body, 'body');
        const { errors, isValid } = await validateRegisterInput(req.body);

        // Check here Username isExists or not
        const userNameExist = await Employee.findOne({
            username: req.body.username,
        });

        // Check here MobileNO isExists or Not
        const mobileExist = await Employee.findOne({
            mobileno: req.body.mobileno,
        });

        // Check here Email isExists or not
        const emailExist = await Employee.findOne({ email: req.body.email });

        if (userNameExist !== null) {
            errors.username = 'Username can be Already Exists';
        }

        if (mobileExist !== null) {
            errors.mobileno = 'Mobile can be Already Exists';
        }

        if (emailExist !== null) {
            errors.email = 'Email can be Already Exists';
        }

        if (isEmpty(errors.profilephoto)) {
            const matches = req.body.profilephoto.match(
                    /^data:([A-Za-z-+\/]+);base64,(.+)$/
                ),
                image = {};
            image.type = matches[1];
            image.data = new Buffer.from(matches[2], 'base64');
            let decodedImg = image;
            var imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            var extension = mime.getExtension(type);

            const filetypes = /jpg|JPG|jpeg|JPEG|png|PNG|GIF|gif/;
            const check_image = !filetypes.test(extension);
            console.log('exrtension1::', extension);

            if (check_image) {
                errors.profilephoto = 'Only image files are allowed';
            }
        }

        if (!isValid || !isEmpty(errors)) {
            const response = {};
            response.error = true;
            response.message = 'All Fields are Required';
            response.errors = errors;
            return res.status(422).json(response);
        } else {
            console.log('exrtension2::::::::::::::', extension);
            var filepath = '/upload/Profile_Photo/';
            var publicpath = process.cwd() + '/public';
            var storepath = publicpath + filepath;
            console.log(storepath, 'storepath');
            fse.mkdirsSync(storepath);
            var filename = Date.now() + '-DP' + '.' + extension;
            fs.writeFileSync(storepath + filename, imageBuffer, 'utf8');

            const employee = new Employee({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                profilephoto: filename,
                email: req.body.email,
                mobileno: req.body.mobileno,
                dob: req.body.dob,
                hobbies: req.body.hobbies,
            });

            const employees = await employee.save();

            res.status(201).json({
                success: true,
            });
        }
    } catch (e) {
        console.log('Error', e);
    }
};

// @desc      Get all employees
// @route     GET /employees/create
// @access    Public
exports.getCreateEmployees = asyncHandler(async (req, res, next) => {
    const employees = await Employee.find();

    res.render('employee/create', {
        req: req,
        data: employees,
    });
});

// @desc      Get all employees
// @route     GET /employees
// @access    Public
exports.getEmployees = asyncHandler(async (req, res, next) => {
    const employees = await Employee.find();

    // res.status(200).json({
    //     success: true,
    //     count: employees.length,
    //     data: employees,
    // });
    res.render('index', {
        req: req,
        response: employees,
    });
});

// @desc      Get Single employee
// @route     GET /employees/edit/:id
// @access    Public
exports.getEmployee = async (req, res, next) => {
    try {
        let employee = await Employee.findById(req.params.id);

        if (employee !== null) {
            console.log('employee', employee);
            res.render('employee/edit.ejs', { employee: employee });
        } else {
            res.status(404).json({
                error: true,
                msg: 'Employee ID is Not Found',
            });
        }
    } catch (error) {
        console.log(error, 'ERROR');
    }
};

// @desc      Update Employee
// @route     PATCH /employees/edit/:id
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
    res.render('employee/edit', {
        req: req,
        response: employee,
    });
});

// @desc      Delete employee
// @route     DELETE /employees/:id
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
