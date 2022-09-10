/* eslint-disable jsx-a11y/anchor-is-valid */
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import React, { useState } from "react";
import "../components/navbar.css";
import Signin from "./signin";
import Signup from "./signup";

function Navbar() {
  const { logoutUser } = useUserContext();
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav">
      <a href="#" className="nav__brand">
        Wits Overflow
      </a>
      <ul className={active}>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Home
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Tags
            <Router>
            <Routes>
                    
             <Route path="/signin" exact component={Signin}/>
            </Routes>
            </Router>
            
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Questions
            <Router>
            <Routes>
                    <Route exact path="/signup"  component = {Signup} />
            </Routes>
            </Router>
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Users
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
          <div onClick={logoutUser}>Log out</div>
          </a>
        </li>
        
      </ul>
      
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}


export default Navbar;