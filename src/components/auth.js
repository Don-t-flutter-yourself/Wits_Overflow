import React, { useState } from "react";
import Signin from "./signin";
import Signup from "./signup";



//Authentication page for the sign up page

const Auth = () => {
  const [index, setIndex] = useState(false);
  const toggleIndex = () => {
    setIndex((prevState) => !prevState);
  };
  //start of form
  return (
    <div className="back">
    <div className="com">
      {!index ? <Signin /> : <Signup />}
      <p className="transfer" onClick={toggleIndex}>
        {!index ? "New user? Sign Up " : "Already have an account?"}
      </p>
    </div>
    </div>
  );
};

export default Auth;