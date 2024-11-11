const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();


//create employee
router.post("/", async (req, res) => {
  const { name, email, mobile, designation, gender, image, course, createDate } = req.body;
  try {
    const employeeAdded = await Employee.create({
      name: name,
      email: email,
      mobile: mobile,
      designation: designation,
      gender: gender,
      image: image,
      course:course,
      createDate: createDate
    });
    res.status(201).json(employeeAdded);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

//read employee
router.get("/", async (req, res) => {
  try {
    const showEmployees = await Employee.find();
    res.status(200).json(showEmployees);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//single employee
router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const singleEmployee = await Employee.findById({_id:id});
    res.status(200).json(singleEmployee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const singleEmployee = await Employee.findByIdAndDelete({_id:id});
    res.status(200).json(singleEmployee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//update
router.patch("/:id", async (req, res) => {
  const {id} = req.params;
  const { name, email, mobile, designation, gender, image, course, createDate } = req.body;
  try {
    const updateEmployee = await Employee.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json(updateEmployee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null,uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post("/upload-image",upload.single("image"),async (req,res)=>{
  console.log(req.body);
  res.send("Uploaded");
})

module.exports = router;
