import React, {Component} from "react";
import firebase from "../firebase/index";
import { UserContext } from "../context/userContext";


import { useEffect, useState } from 'react';
import {getAuth , onAuthStateChanged} from "firebase/auth" ;
import { app } from '../firebase/index' ;
import { uuidv4 } from "@firebase/util";
//import {Container} from '@material-ui/core';

const auth = getAuth(app) ;

//const doc_id = uuidv4() ;


function MyPostsT(){


   
    const [myposts, setMyPosts] = useState([]) ;
    const [u_id, setId] = useState('') ;


    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if(user){
               setId(user.uid)
            }
        })

    },[]);

   

    
    const ref = firebase.firestore().collection("UAnswers")


    
    function getMyPosts(){
        ref.where('u_id', '==', u_id ).onSnapshot((querySnapshot) => {
            const items = [] ;
            querySnapshot.forEach((doc) => {
                items.push(doc.data()) ;
            }) ;
            setMyPosts(items) ;
        })
    }

    useEffect(() => {
        getMyPosts() ;
    }) ;

    const dif = firebase.firestore().collection("UAnswers")  ;
    function uCorrect(datapoint){
        dif.doc(datapoint.doc_id).update(datapoint) ;
        alert("Marked as correct") ;
    }
    function uNotCorrect(datapoint){
        dif.doc(datapoint.doc_id).update(datapoint) ;
        alert("Marked as incorrect") ;
    }

    return (
        <div>
             <h2>My Posts</h2>
             
            {myposts.map((mypost) => (
                <>
                <div key= {mypost.doc_id}> 
                {/* <Container maxWidth="lg" style={{backgroundColor:"whitesmoke"}}> */}
                    <h5>Username :  {mypost.u_username}</h5>
                    <h5>Email :  {mypost.u_email}</h5>
                    <h5>Caption :  {mypost.u_caption}</h5>
                    <h5>Question : <p> {mypost.u_question}</p> </h5>
                    <h5>Answer : <p> {mypost.u_answer}</p> </h5>
                    <h5>Marked as: <p> {mypost.u_correct}</p></h5>
                    <div>
                    <button onClick={() => uCorrect({doc_id: mypost.doc_id, u_id: mypost.u_id, u_username: mypost.u_username, u_caption: mypost.u_caption, u_question: mypost.u_question, u_answer: mypost.u_answer, u_correct:"Correct"})}>Correct</button> 
                    <button onClick={() => uNotCorrect({doc_id: mypost.doc_id, u_id: mypost.u_id, u_username: mypost.u_username, u_caption: mypost.u_caption, u_question: mypost.u_question, u_answer: mypost.u_answer, u_correct:"Not Correct"})}>Inorrect</button> 

                    </div>
                    
                 
                 {/* </Container> */}
                </div>
                <div>
                <p>    ===========================================================================================================================</p>
               </div>
                </>
            ))}
       
  
          
        </div>
             
  )
}

export default MyPostsT ;