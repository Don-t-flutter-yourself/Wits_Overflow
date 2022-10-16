import React, {Component} from 'react' ;
import { v4  as uuidv4 } from 'uuid' ;
import firebase from '../firebase/index' ;
import '../styles/Posts.css';
import Signup from './signup';


import { useEffect, useState } from 'react';
import {getAuth , onAuthStateChanged} from "firebase/auth" ;
import { app } from '../firebase/index' ;
//import Select from 'react-select';
//import makeAnimated from 'react-select/animated';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const auth = getAuth(app) ;
//set states for data fetching
//commented out part of the code to be used in the next sprint

function PostsT(){
    const [u_caption, setCaption] = useState('') ;
    const [u_question, setQuestion] = useState('') ;
    const [u_email, setEmail] = useState('') ;
    const [u_username, setUsername] = useState('') ;
    const [u_id, setId] = useState('') ;
    //const [u_tag, setTag] = useState('React');

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

    const u_doc_id = uuidv4() ;
    const ref = firebase.firestore().collection('UserPosts').doc(u_doc_id) ;
 
    function handleAddPost(datapoint){   //Where post is the entire object/datapoint
        ref.set(datapoint) 
        toast("Question Posted.")
    }

    // const actions = [
    //     { label: "Javascript", value: 1 },
    //     { label: "React", value: 2 },
    //     { label: "Props", value: 3 }
    // ];

    // const animatedComps = makeAnimated();

  
    return(
    <div className='createquestionPage'>
        <h1 className='postQTitle'>Post Question</h1>
        <div>
            <h3 className='heading'>Caption</h3>
          <textarea className='captionbox' placeholder="Caption" type="caption"  onChange={(event) => setCaption(event.target.value)} />
        </div>
        <div>
            <h3 className='heading'>Question</h3>
          <textarea className='questionbox' placeholder="Question" type="question" onChange={(event) => setQuestion(event.target.value)} />
        </div>

        {/* <div>
            <h3 className='heading'>Tags</h3>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Select options={ actions } components={animatedComps} isMulti isSearchable 
                    // value={u_tag} 
                    onChange={(event) => console.log(event.length)}
                    />
                </div>
                <div className="col-md-4"></div>
            </div>
        </div> */}
       
        <button className='postbtn' type="submit" onClick={() => handleAddPost({u_Upvote:0, u_Downvote:0, u_doc_id, u_caption, u_question,u_username, u_email, u_id, u_created: new Date()})}>Post</button>

    </div>)
}

export default PostsT ;
