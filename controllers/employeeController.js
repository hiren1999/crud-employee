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
exports.updateEmployee = async (req, res, next) => {
    try {
        var url = req.originalUrl.split('/');
        const { errors, isValid } = await validateRegisterInput(
            req.body,
            url[2]
        );

        Employee.findOne({ username: req.body.username }).then(
            (check_username) => {
                if (
                    check_username &&
                    isEmpty(errors.username) &&
                    check_username._id != req.params.id
                ) {
                    errors.username = 'User already exist';
                }
                Employee.findOne({ email: req.body.email }).then(
                    (check_email) => {
                        if (
                            check_email &&
                            isEmpty(errors.email) &&
                            check_email._id != req.params.id
                        ) {
                            errors.email = 'Email already exist';
                        }

                        if (!isEmpty(req.body.profilephoto)) {
                            var matches = req.body.profilephoto.match(
                                    /^data:([A-Za-z-+\/]+);base64,(.+)$/
                                ),
                                image = {};

                            image.type = matches[1];
                            image.data = new Buffer.from(matches[2], 'base64');
                            let decodedImg = image;
                            var imageBuffer = decodedImg.data;
                            let type = decodedImg.type;
                            var extension = mime.getExtension(type);

                            var filetypes = /jpg|JPG|jpeg|JPEG|png|PNG|GIF|gif/;
                            var check_image = !filetypes.test(extension);

                            if (check_image) {
                                errors.profilephoto =
                                    'Only image files are allowed';
                            }
                        }

                        if (!isValid || !isEmpty(errors)) {
                            var response = {};
                            response.error = true;
                            response.message = 'missing some field';
                            response.errors = errors;
                            return res.status(422).json(response);
                        } else {
                            Employee.findOne({ _id: req.params.id }).exec(
                                function (err, employee) {
                                    if (!isEmpty(req.body.profilephoto)) {
                                        var filepath = '/upload/Profile_Photo/';

                                        var publicpath =
                                            process.cwd() + '/public';
                                        var storepath = publicpath + filepath;

                                        fse.mkdirsSync(storepath);

                                        var filename =
                                            Date.now() +
                                            '-DP' +
                                            '.' +
                                            extension;
                                        fs.writeFileSync(
                                            storepath + filename,
                                            imageBuffer,
                                            'utf8'
                                        );

                                        old_file =
                                            storepath + employee.profilephoto;

                                        fs.unlink(old_file, (err) => {
                                            if (err) {
                                                console.error(err);
                                            }
                                        });
                                    }

                                    let employee_data = {};
                                    employee_data.username = req.body.username;
                                    employee_data.email = req.body.email;
                                    employee_data.firstname =
                                        req.body.firstname;
                                    employee_data.lastname = req.body.lastname;
                                    employee_data.mobileno = req.body.mobileno;
                                    employee_data.dob = req.body.dob;
                                    employee_data.hobbies = req.body.hobbies;
                                    employee_data.gender = req.body.gender;

                                    if (!isEmpty(req.body.profilephoto)) {
                                        employee_data.profilephoto = filename;
                                    }

                                    let query = { _id: req.params.id };
                                    Employee.updateOne(
                                        query,
                                        employee_data,
                                        function (err) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                var response = {};
                                                response.success = true;
                                                response.error = false;
                                                response.message =
                                                    'Employee Record updated Successfully';
                                                res.status(200).json(response);
                                            }
                                        }
                                    );
                                }
                            );
                        }
                    }
                );
            }
        );
    } catch (error) {
        console.log(error, 'ERROR');
    }
};

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

// @desc      Get employees list
// @route     GET /employees/list
// @access    Public
exports.getEmployeesList = (req, res) => {
    res.render('employee/list', {
        req: req,
    });
};

// @desc      employees list
// @route     POST /employees/list
// @access    Public

exports.postEmployeesList = (req, res) => {
    var columns = [
        'firstname',
        'lastname',
        'email',
        'mobileno',
        '_id',
        'dob',
        'gender',
        'profilephoto',
        'hobbies',
    ];
    var searchStr = req.body.search.value;
    var sortingColumn = req.body.order[0].column;

    var columnsData = req.body.columns[sortingColumn].data;
    var sortingType = req.body.order[0].dir;
    var sortJson = {};
    if (sortingType == 'desc') {
        sortJson[columns[sortingColumn]] = -1;
    } else {
        sortJson[columns[sortingColumn]] = 1;
    }
    if (req.body.search.value != '') {
        var regex = new RegExp(req.body.search.value, 'i');
        console.log('search', req.body.search.value);
        searchStr = {
            $or: [
                { firstname: regex },
                { lastname: regex },
                { email: regex },
                { mobileno: regex },
            ],
        };
    } else if (req.body.columns[0].search.value != '') {
        var regex = new RegExp(req.body.columns[0].search.value, 'i');
        searchStr = { $or: [{ firstname: regex }] };
    } else if (req.body.columns[1].search.value != '') {
        var regex = new RegExp(req.body.columns[1].search.value, 'i');
        searchStr = { $or: [{ lastname: regex }] };
    } else if (req.body.columns[2].search.value != '') {
        var regex = new RegExp(req.body.columns[2].search.value, 'i');
        searchStr = { $or: [{ email: regex }] };
    } else if (req.body.columns[3].search.value != '') {
        var regex = new RegExp(req.body.columns[3].search.value, 'i');
        searchStr = { $or: [{ mobileno: regex }] };
    } else if (req.body.columns[4].search.value != '') {
        var regex = new RegExp(req.body.columns[4].search.value, 'i');
        searchStr = { $or: [{ _id: regex }] };
    } else {
        searchStr = {};
    }

    employee_search = searchStr;

    var recordsTotal = 0;
    var recordsFiltered = 0;

    Employee.countDocuments({}, function (err, c) {
        recordsTotal = c;
        Employee.countDocuments(searchStr, function (err, c) {
            recordsFiltered = c;

            Employee.find(searchStr, columns, {
                skip: Number(req.body.start),
                limit: Number(req.body.length),
            })
                .sort(sortJson)
                .exec(function (err, result) {
                    if (err) {
                        console.log('error while getting result' + err);
                        return;
                    }
                    var data = JSON.stringify({
                        draw: req.body.draw,
                        recordsFiltered: recordsFiltered,
                        recordsTotal: recordsTotal,
                        data: result,
                    });
                    res.send(data);
                });
        });
    });
};
