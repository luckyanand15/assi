import React, { useEffect, useState } from "react";
import Styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');

  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    setUsername(storedUserName ? storedUserName.replace(/^"|"$/g, "") : "");
  }, []);
  return (
    <nav style={{ backgroundColor: "#DEE9F5" }}>
      <div className={Styles.container}>
        <ul className={Styles.wrapper}>
          <div className={Styles.wrapperInner}>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/employees">Employee List</Link>
            </li>
          </div>
          <li>
            {userName} -{" "}
            <button className={Styles.btn} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
