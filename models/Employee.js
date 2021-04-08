const mongoose = require("mongoose");
const validator = require("validator");

const EmployeeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Username can be Required");
        }
      },
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Firstname can be Required");
        }
      },
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Lastname can be Required");
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
        if (validator.isEmpty(value)) {
          throw new Error("Email can be Required");
        }
      },
    },
    mobileno: {
      type: String,
      unique: true,
      required: true,
      maxlength: [10, "Mobile number can not be longer than 10 characters"],
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Mobile No can be Required");
        }
      },
    },
    profilephoto: {
      type: String,
      required: true,
      default: "no-photo.jpg",
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Profile Photo can be Required");
        }
      },
    },
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
    dob: {
      type: Date,
      required: true,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("DOB can be Required");
        }
      },
    },
    hobbies: {
      type: Array,
      required: true,
      default: false,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Please select your Hobbies");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
