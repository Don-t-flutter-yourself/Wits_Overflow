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
import Swal from "sweetalert2";
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
        if(postimage !== ''){
            uploadT.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    Swal.fire({
                        icon: 'info',
                        title: 'Loading..',
                        text: 'Hold on as we send the question',
                        footer: '<a href="">question being loading to website.</a>'
                      })
                    storage
                        .ref("PostsImages")
                        .child(postimage.name)
                        .getDownloadURL()
                        .then(url => {
                            //setUrl(url)
                            //console.log(url) 
                            datapoint.u_image = url 
                            ref.set(datapoint) 
                            Swal.fire({
                                icon: 'success',
                                title: 'Question Posted',
                                text: 'Your Question has been sent!',
                                footer: '<a href="">You shall get an answer soon.</a>'
                              })
                            //nav('/myposts')
                            
                            }
                        )
                }
            )
        }
        else if(u_caption.length == ' '){
            Swal.fire({
              icon: 'error',
              title: 'Check Caption ',
              text: 'Enter caption',
              footer: '<a href="">Enter your caption.</a>'
            });
        }
        else if(u_question.length == ' '){
            Swal.fire({
              icon: 'error',
              title: 'Check Question',
              text: 'Enter question',
              footer: '<a href="">Enter your question.</a>'
            });
        }
        else if(u_category == 'React'){
            Swal.fire({
              icon: 'error',
              title: 'Check Category',
              text: 'Select a category',
              footer: '<a href="">Select a category.</a>'
            });
        }
        else{
            ref.set(datapoint) 
            Swal.fire({
                icon: 'success',
                title: 'Question Posted',
                text: 'Your Question has been sent!',
                footer: '<a href="">You shall get an answer soon.</a>'
              })
            nav('/myposts')

        }
       
    }

    const actions = [
        {label: "Software Design", value: 1 },
        { label: "Software Design", value: 1 },
        { label: "Advanced Analysis of Algorithms", value: 2 },
        { label: "Parallel Computing", value: 3 },
        { label: "Operating Systems", value: 4 },
        { label: "Computer Graphics and Visualization", value: 5 },
        { label: "Machine Learning", value: 6 },
        { label: "Formal Languages and Automata", value: 7 }
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
            <h3 className='heading'>Category<a href='/categories'> (Descriptions) </a> </h3>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Select options={ actions } components={animatedComps} isSearchable 
                    onChange={(event) => 
                        setCategory(Array.isArray(event)?event.map(x=>x.label):[])}
                    />
                </div>
                <div className="col-md-4"></div>
            </div>
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
       {console.log(u_category)}
        <button className='postbtn' type="submit" onClick={() => handleAddPost({u_image:"", u_Upvote:0, u_Downvote:0, u_doc_id, u_caption, u_question,u_username, u_email, u_id, u_created: new Date(), u_category})}>Post</button>

    </div>)
}

export default PostsT ;
