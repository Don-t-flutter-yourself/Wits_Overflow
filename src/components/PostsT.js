import React, {Component} from 'react' ;
import { v4  as uuidv4 } from 'uuid' ;
import firebase from '../firebase/index' ;
import '../styles/Posts.css';
import Signup from './signup';
import { storage } from '../firebase/index';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import {getAuth , onAuthStateChanged} from "firebase/auth" ;
import { app } from '../firebase/index' ;
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

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
    const [u_category, setCategory] = useState('React');

    ///Left with the time and date at which the post is created
    const hiddenFileInput = React.useRef(null);
    const [postimage, setSelectedImage] = useState('');
    //const [pUrl, setUrl] = useState('');

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

    const nav = useNavigate();
 
    function handleAddPost(datapoint){   //Where post is the entire object/datapoint
        const uploadT = storage.ref(`PostsImages/${postimage.name}`).put(postimage);
        uploadT.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                alert("Loading...")
                storage
                    .ref("PostsImages")
                    .child(postimage.name)
                    .getDownloadURL()
                    .then(url => {
                        //setUrl(url)
                        //console.log(url) 
                        datapoint.u_image = url 
                        ref.set(datapoint) 
                        alert("Question Posted.")
                        nav('/posts')
                        }
                    )
            }
        )
    }

    const actions = [
        { label: "Software Design", value: 1 },
        { label: "Software Design Project", value: 2 },
        { label: "Advanced Analysis of Algorithms", value: 3 },
        { label: "Parallel Computing", value: 4 },
        { label: "Operating Systems", value: 5 },
        { label: "Computer Graphics and Visualization", value: 6 },
        { label: "Machine Learning", value: 7 },
        { label: "Formal Languages and Automata", value: 8 }
    ];

    const animatedComps = makeAnimated();

    const handleChange = event => {
        setSelectedImage(event.target.files[0]);
    };

  
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

        <div className='imageUploader'>
            <h3 className='heading'>Attachment</h3>
            <input
                // style={{display:'none'}}
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
            />
        </div>

        <div>
            <h3 className='heading'>Category<a href='/categories'> (More info) </a> </h3>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Select options={ actions } components={animatedComps} isMulti isSearchable 
                    onChange={(event) => 
                        setCategory(Array.isArray(event)?event.map(x=>x.label):[])}
                    />
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
       
        <button className='postbtn' type="submit" onClick={() => handleAddPost({u_image:"", u_Upvote:0, u_Downvote:0, u_doc_id, u_caption, u_question,u_username, u_email, u_id, u_created: new Date(), u_category})}>Post</button>

    </div>)
}

export default PostsT ;
