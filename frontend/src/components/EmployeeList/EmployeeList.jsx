import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Styles from "./EmployeeList.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();
  const naviagate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchData, setSearchData] = useState("");

  const handleEdit = (empid) => {
    navigate(`/edit-employee/${empid}`);
  };
  const handleDelete = async (empid) => {
    try {
      const url = ` http://localhost:5000/employee/${empid}`;
      const resp = await axios.delete(url);
      const updatedEmployees = employees.filter(
        (employee) => employee._id !== empid
      );
      setEmployees(updatedEmployees);
      setTotalCount(updatedEmployees.length);
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getEmployees = async () => {
      const response = await axios.get(`http://localhost:5000/employee`);
      setEmployees(response.data);
      setTotalCount(response.data.length);
    };
    getEmployees();
  }, []);

  const filterData = employees.filter((employee) => {
    return employee.name.toLowerCase().includes(searchData.toLowerCase());
  });
  console.log(filterData);
  return (
    <div className={Styles.wrapper}>
      <NavBar />
      <div>
        <h3>Employee List</h3>
        <div className={Styles.createButton}>
          <p>Total Count: {totalCount}</p>
          <button onClick={() => naviagate("/create-employee")}>
            Create Employee
          </button>
        </div>
        <div className={Styles.search}>
          <input
            type="text"
            placeholder="Enter Search Keyword"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
        {filterData.length > 0 || searchData.length > 0 ? (
          <table>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((employee) => {
              console.log(employee)
              return (
                <tr key={employee._id}>
                  <td>{employee._id}</td>
                  <td>{employee.image}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.course}</td>
                  <td>{employee.createDate}</td>
                  <td>
                    <div className={Styles.editDeleteBtn}>
                      <button onClick={() => handleEdit(employee._id)}>
                        Edit {" - "}
                      </button>
                      <button onClick={() => handleDelete(employee._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Unique Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                return (
                  <tr key={employee._id}>
                    <td>{employee._id}</td>
                    <td>{employee.image}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobile}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.course}</td>
                    <td>{employee.createDate}</td>
                    <td>
                      <div className={Styles.editDeleteBtn}>
                        <button onClick={() => handleEdit(employee._id)}>
                          Edit {" - "}
                        </button>
                        <button onClick={() => handleDelete(employee._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
