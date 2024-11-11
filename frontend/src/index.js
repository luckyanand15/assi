import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/Login/Login"
import Dashboard from './components/Dashboard/Dashboard';
import Read from "./components/Read";
import Update from './components/Update';
import EmployeeList from './components/EmployeeList/EmployeeList';
import CreateEmployee from './components/CreateEmployee/CreateEmployee';
import EditEmployee from './components/EditEmployee/EditEmployee';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {path: "/", element:<Login/>},
      {path: "/dashboard", element:<Dashboard/>},
      {path: "/employees", element:<EmployeeList/>},
      {path: "/create-employee", element:<CreateEmployee/>},
      {path: "/edit-employee/:id", element:<EditEmployee/>},
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);