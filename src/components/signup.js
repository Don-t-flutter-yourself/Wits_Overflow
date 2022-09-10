import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";

const Signup = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { registerUser } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (email && password && username) registerUser(email, password, username);
  };

  return (
    <div className="form">
      <h2> Sign Up</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email"  required ref={emailRef} />
        <input placeholder="Username" type="username" required ref={usernameRef} />
        <input placeholder="Password" type="password"  required ref={passwordRef} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;