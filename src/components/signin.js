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
    <div className="page">
      <div className="signin-form">
        <h2> Sign In </h2>
        <form onSubmit={onSubmit}>
          <input placeholder="Email" type="email" required ref={emailRef} />
          <input placeholder="Password" type="password" required ref={passwordRef} />
          <button type="submit">Sign In</button>
          <a href="/reset">Forgot Password ?</a>
        </form>
      </div>
    </div>
  );
};

export default Signin;
