import React from "react";
import { useUserContext } from "../context/userContext";

const Dashbody = () => {
  const { user} = useUserContext();
  return (
    <div>
      <h1>finishing up</h1>
      <h2>Name : {user.displayName}</h2>
      <h2>Email : {user.email}</h2>
      <h1>Questions asked </h1>
      <h1>Answers given </h1>
      <h1>Time Spent  </h1>
    </div>
  );
};

export default Dashbody;