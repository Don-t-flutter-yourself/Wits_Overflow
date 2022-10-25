import React from "react";
import firebase from "../firebase/index";
//mport { UserContext } from "../context/userContext";
import '../styles/myPosts.css';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase/index';
//import { uuidv4 } from "@firebase/util";
//import {Container} from '@material-ui/core';

const auth = getAuth(app);

//const doc_id = uuidv4() ;


//commented out part of the code to be used in the next sprint

//start of functions
function MyPostsT() {
    const [myposts, setMyPosts] = useState([]);
    const [u_id, setId] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setId(user.uid)
            }
        })
    }, []);
//backend fetch of answers
    const ref = firebase.firestore().collection("UAnswers")

    function getMyPosts() {
        ref.where('u_id', '==', u_id).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setMyPosts(items);
        })
    }

    useEffect(() => {
        getMyPosts();
    });


//display after answer marking
    const dif = firebase.firestore().collection("UAnswers");
    function uCorrect(datapoint) {
        dif.doc(datapoint.doc_id).update(datapoint);
        alert("Marked as correct");
    }
    function uNotCorrect(datapoint) {
        dif.doc(datapoint.doc_id).update(datapoint);
        alert("Marked as incorrect");
    }

    document.body.style.overflow = 'hidden';


    
//function for marking of answer using a correct or incorrect button
    return (
        <div className='mypostPage'>
            <h2 className='myposttitle'>My Posts</h2>

            {myposts.map((mypost) => (
                    <div className="ansCon" key={mypost.doc_id}>
                        <h5 style={{fontFamily: 'sans-serif', textTransform:'uppercase',color:'rgb(0, 33, 65)', fontSize:'20px'}}>Caption :  {mypost.u_caption}</h5>
                        <h5>Question : </h5>
                        <p style={{color:"whitesmoke"}}>{mypost.u_question}</p>
                        <h5>Answer : </h5>
                        <p style={{color:"whitesmoke"}}> {mypost.u_answer}</p> 
                        <h5>Marked as: {mypost.u_correct}</h5>
                        <div>
                            <button className='correctbtn' onClick={() => uCorrect({ doc_id: mypost.doc_id, u_id: mypost.u_id, u_username: mypost.u_username, u_caption: mypost.u_caption, u_question: mypost.u_question, u_answer: mypost.u_answer, u_correct: "Correct" })}>
                                <TiTick size={18} color={"#F5F5F5"} style={{marginRight:"15px", marginTop:"5px"}}/>
                                Correct
                            </button>
                            <button className='incorrectbtn' onClick={() => uNotCorrect({ doc_id: mypost.doc_id, u_id: mypost.u_id, u_username: mypost.u_username, u_caption: mypost.u_caption, u_question: mypost.u_question, u_answer: mypost.u_answer, u_correct: "Not Correct" })}>
                                <ImCross size={12} color={"#F5F5F5"} style={{marginRight:"15px", marginTop:"10px"}}/>
                                Incorrect
                            </button>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default MyPostsT;