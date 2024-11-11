const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(cors());


const userRoute = require("./routes/UserRoute")
const employeeRoute = require("./routes/EmployeeRoutes")
app.use(express.json());


mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected");
    app.listen(process.env.PORT || 5000, (err)=>{
      if(err) console.log(err);
      console.log("Running Successfully at", process.env.PORT)
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/login', userRoute)
app.use('/employee', employeeRoute)
