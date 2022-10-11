import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";
import '../styles/signin.css';

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signInUser } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) signInUser(email, password);
  };

  return (
      <div className="signin-form">
        <h2 className="signh2"> Sign In </h2>
        <form onSubmit={onSubmit}>
        <label className="txt">Email</label>
          <input placeholder="Email" type="email" required ref={emailRef} />
          <label className="txt">Password</label>
          <input placeholder="Password" type="password" required ref={passwordRef} />
          <button className="signinbtn" type="submit">Sign In</button>
          <a href="/reset" style={{marginLeft:"32%", color: "blue"}}>Forgot Password ?</a>
        </form>
      </div>
  );
};

export default Signin;
