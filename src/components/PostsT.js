
/////Thabelo : Had to change class components to function component so I could make use of Hooks

import React, {Component} from 'react' ;
import { v4  as uuidv4 } from 'uuid' ;
import firebase from '../firebase/index' ;
import '../styles/Posts.css';
import Signup from './signup';


import { useEffect, useState } from 'react';
import {getAuth , onAuthStateChanged} from "firebase/auth" ;
import { app } from '../firebase/index' ;

const auth = getAuth(app) ;

function PostsT(){
    const [u_caption, setCaption] = useState('') ;
    const [u_question, setQuestion] = useState('') ;
    const [u_email, setEmail] = useState('') ;
    const [u_username, setUsername] = useState('') ;
    const [u_id, setId] = useState('') ;

    ///Left with the time and date at which the post is created

    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if(user){
               setId(user.uid) ; 
               setEmail(user.email) ;
               setUsername(user.displayName) ;
            }
        })

    }, [])

    const ref = firebase.firestore().collection('UserPosts');
 
    function handleAddPost(datapoint){   //Where post is the entire object/datapoint
        ref.doc(datapoint.id)
        ref.add(datapoint)
        alert("Question Posted.")
    }

  
    return(
    <div className='createquestionPage'>
        <h1>Post Question</h1>
        <div>
            <h3 className='heading'>Caption</h3>
          <textarea className='captionbox' placeholder="Caption" type="caption"  onChange={(event) => setCaption(event.target.value)} />
        </div>
        <div>
            <h3 className='heading'>Question</h3>
          <textarea className='questionbox' placeholder="Question" type="question" onChange={(event) => setQuestion(event.target.value)} />
        </div>
       
        <button className='postbtn' type="submit" onClick={() => handleAddPost({u_caption, u_question,u_username, u_email, u_id, u_created: new Date()})}>Post</button>

    </div>)
}

export default PostsT ;
