import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { UserContextProvider } from "./context/userContext";
//import Dashboard from "./components/dashboard";
import App from "./App";
//app is  needeed
ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      
      <App/>
      
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);