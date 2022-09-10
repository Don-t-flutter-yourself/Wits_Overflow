import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";
//import resetPassword from "./resetPassword";

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signInUser} = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) signInUser(email, password);
  };

  /*
  <p onClick={forgotPasswordHandler}>Forgot Password?</p>
  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email)
      forgotPassword(email).then(() => {
        emailRef.current.value = "";
      });
  };*/

  return (
    <div className="form">
      <h2> Sign In </h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" required ref={emailRef} />
        <input placeholder="Password" type="password" required ref={passwordRef} />
        <button type="submit">Sign In</button>
      
        
      </form>
    </div>
  );
};

export default Signin;