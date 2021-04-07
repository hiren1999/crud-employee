const Validator = require("validator");
const isEmpty = require("./isEmpty");
const Mongoose = require("mongoose");

module.exports = async function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.mobileno = !isEmpty(data.mobileno) ? data.mobileno : "";
  data.profilephoto = !isEmpty(data.profilephoto) ? data.profilephoto : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.hobbies = !isEmpty(data.hobbies) ? data.hobbies : "";

  // USERNAME FEILD
  if (!Validator.isLength(data.username, { min: 2, max: 10 })) {
    errors.username = "Username must be between 2 and 10 characters";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // FIRSTNAME AND LASTNAME FEILD
  const alpha = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;

  if (!data.firstname.match(alpha)) {
    errors.firstname = "Enter only character";
  }
  if (!data.lastname.match(alpha)) {
    errors.lastname = "Enter only character";
  }
  if (!Validator.isLength(data.firstname, { min: 2, max: 15 })) {
    errors.firstname = "Firstname must be between 2 and 15 characters";
  }
  if (!Validator.isLength(data.lastname, { min: 2, max: 15 })) {
    errors.lastname = "Lastname must be between 2 and 15 characters";
  }
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "Firstname field is required";
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Lastname field is required";
  }

  // EMAIL FEILD
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // MOBILE NO FEILD
  if (Validator.isEmpty(data.mobileno)) {
    errors.mobileno = "Mobile NO field is required";
  }
  if (!Validator.isLength(data.mobileno, { max: 10 })) {
    errors.mobileno = "Firstname must be 10 numbers";
  }

  // GENDER FEILD
  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Please Select Gender";
  }

  // DOB FEILD
  if (Validator.isEmpty(data.dob)) {
    errors.dob = "Please Select Your DOB";
  }

  // HOBBIES FEILD
  if (Validator.isEmpty(data.hobbies)) {
    errors.hobbies = "Please Select Hobbies";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
