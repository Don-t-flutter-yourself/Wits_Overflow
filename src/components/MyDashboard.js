import React from "react";
import Navbar from "./navbar";
import "../components/navbar.css";
import firebase from "../firebase/index";
import { useEffect, useState } from 'react';


const Dashboard = () => {
  const [myAnswers, setMyAnswers] = useState([]);

  const ref = firebase.firestore().collection("UAnswers")

  function getMyAnswers() {
      ref.onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
              items.push(doc.data());
          });
          setMyAnswers(items);
      })
  }

  useEffect(() => {
      getMyAnswers();
  });
  return (
    <React.Fragment>
    <div>
     <h1>All Answers to All Questions</h1>
    </div>
     <div>
     {myAnswers.map((myanswer) => (
                <>
                    <div key={myanswer.doc_id}>
                        <h5>Question : <p> {myanswer.u_question}</p> </h5>
                        <h5>Answer : <p> {myanswer.u_answer}</p> </h5>
                        <hr/>
                    </div>
                </>
            ))}

     </div>

    </React.Fragment>
    
  );
};

export default Dashboard;
