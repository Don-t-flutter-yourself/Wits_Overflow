import React from "react";
//import styled,{createGlobalStyle} from 'styled-components';
//import { useUserContext } from "../context/userContext";
import Navbar from "./navbar";
import "../components/navbar.css";
import Signin from "./signin";
import Dashbody from "./dashbody";
//import Signup from "./signup";

import { BrowserRouter, Routes,Route} from "react-router-dom";
//const GLobalStyles = createGlobalStyle


const Dashboard = () => {
  
  return (
    <div>
     
      <Navbar />
      <Dashbody />
      <BrowserRouter>
      <Routes>
        <Route path="/signin" exact component={Signin}/>
      </Routes>
      </BrowserRouter>
      
      
    </div>
  );
};

export default Dashboard;