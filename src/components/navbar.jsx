/* eslint-disable jsx-a11y/anchor-is-valid */
//import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import React, { useState } from "react";
import "../components/navbar.css";
import LOGO from '../images/logo.png';
//import Signin from "./signin";
//import Signup from "./signup";

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
      <img className="logo" src={LOGO}/>
      <a href="#" className="nav__brand">
        Wits Overflow
      </a>
      <ul className={active}>
        <li className="nav__item">
          <a href="/dashboard" className="nav__link">    
            Dashboard
          </a>
        </li>
        <li className="nav__item">
          <a href="/profile" className="nav__link">    
            Profile
          </a>
        </li>
        <li className="nav__item">
          <a href="/createposts" className="nav__link">
            Create Post
          </a>
        </li>
        <li className="nav__item">
          <a href="/posts" className="nav__link">
            Posts
          </a>
        </li>
         <li className="nav__item">
          <a href="/myposts" className="nav__link">
            Answers-To-My-Posts
          </a>
        </li>
        {/* <li className="nav__item">
          <a href="/allusers" className="nav__link">
            Users
          </a>
        </li> */}
        <li className="nav__item">
          <a href="/" className="nav__link">
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
