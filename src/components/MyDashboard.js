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
            <div className='mypostPage'>
                <h1 className='myposttitle'>All Answers to All Questions</h1>

                {myAnswers.map((myanswer) => (
                    <div key={myanswer.doc_id}>
                        <br/>
                        <h3 style={{fontFamily: 'sans-serif', textTransform:'uppercase',color:'rgb(0, 33, 65)'}}>Question : </h3>
                        <p> {myanswer.u_question}</p>
                        <br/>
                        <h4 style={{fontFamily: 'sans-serif', textTransform:'uppercase',color:'rgb(0, 33, 65)'}}>Answer : </h4>
                        <p> {myanswer.u_answer}</p>
                        <br/>
                        <hr />
                    </div>
                ))}

            </div>

        </React.Fragment>

    );
};

export default Dashboard;
