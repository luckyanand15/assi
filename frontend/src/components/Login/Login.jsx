import React, { useState } from "react";
import Styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const login = async (formData) => {
    try {
      const apiUrl = `http://localhost:5000/login/`;
      const response = await axios.post(apiUrl, formData);
      const username = response.data.user.username;
      const password = response.data.user.password;
      localStorage.setItem("username",JSON.stringify(username));
      localStorage.setItem("password",JSON.stringify(password));
      navigate("/dashboard");
    } catch (err) {
      alert("invalid login details");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
    login(loginData);
  };

  return (
    <div className={Styles.wrapper}>
      <h3>Login Page</h3>
      <form onSubmit={handleSubmit}>
        <div className={Styles.griding}>
          <label htmlFor="username" className={Styles.gridItem}>
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={Styles.griding}>
          <label htmlFor="password" className={Styles.gridItem}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={Styles.griding}>
          <div></div>
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
