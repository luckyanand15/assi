import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Styles from "./EditEmployee.module.css";

const EditEmployee = () => {
  const { id } = useParams();
  const [error,setError] = useState("")
  const [image,setImage] = useState()
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: "",
  });
  const navigate = useNavigate();
  const getEmployee = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/employee/${id}`);
      setEmployee(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getEmployee();
  }, [id]);

  const handleCourseChange = (e) => {
    const course = e.target.value;
    setEmployee((prevState) => ({
      ...prevState,
      course: prevState.course.includes(course)
        ? prevState.course.filter((c) => c !== course)
        : [...prevState.course, course],
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (employee.course.length === 0) {
      alert("Please select at least one course.");
      setError("Please select at least one course.");
      return
    }
    setError("");
    try {
      const formData = new FormData();
      formData.append("image",image);
      
      const result = await axios.post(
        "http://localhost:5000/employee/upload-image",
        formData,
        {
          headers:{"Content-Type":"multipart/form-data"}
        }
      )


      const url = `http://localhost:5000/employee/${id}`;
      const resp = await axios.patch(
        url,
        {
          name: employee.name,
          email: employee.email,
          mobile: employee.mobile,
          designation: employee.designation,
          gender: employee.gender,
          course: employee.course,
          image: employee.image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/employees");
    } catch (err) {
      console.log(err);
    }
  };
  const handleImage = (e)=>{
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }
  return (
    <div className={Styles.wrapper}>
      <NavBar />
      <h3>Employee Edit</h3>
      <form onSubmit={handleUpdate}>
        <div className={Styles.griding}>
          <label htmlFor="name" className={Styles.griditem}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={Styles.griding}>
          <label htmlFor="email" className={Styles.griditem}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={Styles.griding}>
          <label htmlFor="mobile" className={Styles.griditem}>
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={employee.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className={Styles.griding}>
          <label htmlFor="designation" className={Styles.griditem}>
            Designation
          </label>
          <select
            id="designation"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Designation
            </option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className={Styles.griding}>
          <label htmlFor="gender" className={Styles.griditem}>
            Gender
          </label>
          <div>
            <label>
              <input
                id="gender"
                type="radio"
                name="gender"
                value="M"
                onChange={handleChange}
                checked={employee.gender === "M"}
                required
              />
              Male
            </label>
            <label>
              <input
                id="gender"
                type="radio"
                name="gender"
                value="F"
                onChange={handleChange}
                checked={employee.gender === "F"}
                required
              />
              Female
            </label>
          </div>
        </div>

        <div className={Styles.griding}>
          <label htmlFor="course" className={Styles.griditem}>
            Course
          </label>
          <div>
            <label>
              <input
                id="course"
                type="checkbox"
                value="MCA"
                onChange={handleCourseChange}
                checked={employee.course.includes("MCA")}
              />{" "}
              MCA
            </label>
            <label>
              <input
                id="course"
                type="checkbox"
                value="BCA"
                onChange={handleCourseChange}
                checked={employee.course.includes("BCA")}
              />{" "}
              BCA
            </label>
            <label>
              <input
                id="course"
                type="checkbox"
                value="BSC"
                onChange={handleCourseChange}
                checked={employee.course.includes("BSC")}
              />{" "}
              BSC
            </label>
          </div>
        </div>

        <div className={Styles.griding}>
          <label htmlFor="image" className={Styles.griditem}>
            Image
          </label>
          <input type="file" accept=".jpeg, .jpg, .png" onChange={handleImage}/>
        </div>
        <div className={Styles.griding}>
          <div></div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
