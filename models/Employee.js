const mongoose = require("mongoose");
const validator = require("validator");

const EmployeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // validate(value) {
    //   if (validator.isAlphanumeric(value)) {
    //     throw new Error("Username can be Char and Number");
    //   }
    // },
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isAlpha(value)) {
        throw new Error("Firstname can be only Char");
      }
    },
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isAlpha(value)) {
        throw new Error("Lastname can be only Char");
      }
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (validator.isEmail(value)) {
        throw new Error("Entered Email is InValid");
      }
    },
  },
  mobileno: {
    type: String,
    unique: true,
    required: true,
    maxlength: [10, "Mobile number can not be longer than 10 characters"],
    validate(value) {
      if (validator.isMobilePhone(value)) {
        throw new Error("Entered Mobile No is InValid");
      }
    },
  },
  // profilephoto: {
  //   type: String,
  //   required: true,
  //   default: "no-photo.jpg",
  //   // validate(value) {
  //   //   if (validator.isBase64(value)) {
  //   //     throw new Error("Profile picture is InValid");
  //   //   }
  //   // },
  // },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE"],
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please select your Gender");
      }
    },
  },
  // dob: {
  //   type: Date,
  //   required: true,
  //   // validate(value) {
  //   //   if (validator.isDate(value)) {
  //   //     throw new Error("Please Enter your DOB");
  //   //   }
  //   // },
  // },
  // hobbies: {
  //   type: Array,
  //   required: true,
  //   default: false,
  //   // validate(value) {
  //   //   if (validator.isEmpty(value)) {
  //   //     throw new Error("Please select your Hobbies");
  //   //   }
  //   // },
  // },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
