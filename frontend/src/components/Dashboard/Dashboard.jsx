import React from 'react'
import NavBar from "../NavBar/NavBar";
import Styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={Styles.wrapper}>
      <NavBar/>
      <h3>Dashboard</h3>
      <p>Welcome Admin Panel</p>
    </div>
  )
}

export default Dashboard