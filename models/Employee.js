const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        mobileno: {
            type: String,
            unique: true,
            required: true,
            maxlength: [
                10,
                "Mobile number can not be longer than 10 characters",
            ],
        },
        profilephoto: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["MALE", "FEMALE"],
        },
        dob: {
            type: Date,
            required: true,
        },
        hobbies: {
            type: Array,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
