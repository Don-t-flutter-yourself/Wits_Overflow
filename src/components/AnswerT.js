///////////Thabelo:
import { useLocation, useNavigate } from "react-router-dom";

import React, {Component} from 'react' ;
import { v4  as uuidv4 } from 'uuid' ;
import firebase from '../firebase/index' ;


import { useEffect, useState } from 'react';
import { app } from '../firebase/index' ;

import {getAuth , onAuthStateChanged} from "firebase/auth" ;

const auth = getAuth(app) ;

//const doc_id = uuidv4() ;

//const ref = firebase.firestore().collection('Answers').doc(doc_id) ;

const AnswerT = (props) => {
    const doc_id = uuidv4() ;

    const ref = firebase.firestore().collection('UAnswers').doc(doc_id) ;
    const loc = useLocation() ;
    const [u_answer, setAnswer] = useState() ;
    const [u_caption, setCaption] = useState('') ;
    const [u_question, setQuestion] = useState('') ;
    const [u_email, setEmail] = useState('') ;
    const [u_username, setUsername] = useState('') ;
    const [u_id, setId] = useState("") ;

    const [own_id, setOwnId] = useState('') ;

    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if(user){
               setOwnId(user.uid) ; 
             
            }
        })

    }, [])


    const nav = useNavigate();
    function myAnswer(datapoint){
        if(own_id === u_id){
            alert("Can't answer your own question ") ;
         }else{
            ref.set(datapoint) ;
            alert("Posted") ;
            nav('/allanswers');
         }
  
    }

    return(
        <div>
             <textarea placeholder="Answer" type="answer"  onChange={(event) => {
                setAnswer(event.target.value) ;
                setCaption(loc.state.my_caption) ;
                setQuestion(loc.state.my_question) ;
                setEmail(loc.state.my_email) ;
                setUsername(loc.state.my_username) ;
                setId(loc.state.my_uid) ;
            } 
                


              } />
             <button onClick={()=>myAnswer({u_id, doc_id, u_username, u_email, u_caption, u_question, u_answer, u_correct: "Not Yet Marked"})}>Submit</button>

        </div>
    )
}

export default AnswerT ;