const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, enum: ['HR', 'Manager', 'Sales'], required: true },
  gender: { type: String, enum: ['M', 'F'], required: true },
  course: { type: [String], enum: ['MCA', 'BCA', 'BSC'], required: true },
  image: { type: String },
  createDate: { type: Date, default: Date.now },
},
{ timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
