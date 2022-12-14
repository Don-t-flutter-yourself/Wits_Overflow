import React from "react";
import '../styles/postDetails.css';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase/index';
import { storage } from '../firebase/index';
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { app } from '../firebase/index';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";


//commented out part of the code to be used in the next sprint
const auth = getAuth(app)

const PostDetails = (props) => {

    const doc_id = uuidv4();
//gettting answers from the database
    const ref = firebase.firestore().collection('UAnswers').doc(doc_id);

    const [_user, setUser] = useState();
    const [u_created, setCreated] = useState();
    const [u_answer, setAnswer] = useState();
    const [u_caption, setCaption] = useState('');
    const [u_question, setQuestion] = useState('');
    const [u_email, setEmail] = useState('');
    const [u_username, setUsername] = useState('');
    const [u_id, setId] = useState("");
    //const [u_date, setDate] = useState("");
    const [own_id, setOwnId] = useState('');
    const [u_image, setImage] = useState();
    const [postimage, setSelectedImage] = useState('');

    const [u_answeredby, setName] = useState('');

    const [pulled_answers, setPulledAnswers] = useState([])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setOwnId(user.uid);
                ////
                setName(user.displayName);
             
                /////
                setCaption(loc.state.my_caption);
                setQuestion(loc.state.my_question);
                setEmail(loc.state.my_email);
                setUsername(loc.state.my_username);
                setId(loc.state.my_uid);
                setCreated(loc.state.my_time)
                setImage(loc.state.my_image)
                Pulling(loc.state.my_question)
                setUser(user)
            }
        })

    }, [])

    function Pulling(d_id) {
        const _ref = firebase.firestore().collection('UAnswers')

        _ref.where('u_question', '==', d_id).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setPulledAnswers(items);
        });
    }

    //////Updating the Downvote and Upvote fields when user likes or dislikes
    const rU = firebase.firestore().collection("UserPosts");
    const [up, setUp] = useState() ;
    const [down, setDown] = useState() ;
    function uUpVote(datapoint){
        rU.doc(datapoint.u_doc_id).update(datapoint);
        setUp(datapoint.u_Upvote) ;
        Swal.fire({
            icon: 'info',
            title: 'LIKED!',
            text: 'Up voted.',
            footer: '<a href="">Your vote has been recorded.</a>'
          });

    }
    function uDownVote(datapoint){
        rU.doc(datapoint.u_doc_id).update(datapoint);
        setDown(datapoint.u_Downvote) ;
        Swal.fire({
            icon: 'info',
            title: 'DIS-LIKED!',
            text: 'Down voted.',
            footer: '<a href="">Your vote has been recorded.</a>'
          });

    }

    var inputFileName = document.getElementById("imageFile");
//when user tries to mark their own questions
    function myAnswer(datapoint) {
        const uploadT = storage.ref(`PostsImages/${postimage.name}`).put(postimage);
        if (own_id === u_id) {
            Swal.fire({
                icon: 'warning',
                title: 'EISH!!',
                text: "Can't answer your own question",
                footer: '<a href="">Ask a friend instead.</a>'
              });
        }
        if (u_answer === '') {
            Swal.fire({
                icon: 'error',
                title: 'Check Answer ',
                text: 'Enter Answer',
                footer: '<a href="">Enter your answer.</a>'
            });
        }
        else if(postimage !== ''){
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
                        text: 'Hold on as we send your answer',
                        footer: '<a href="">answer being loading to website.</a>'
                      })
                    storage
                        .ref("PostsImages")
                        .child(postimage.name)
                        .getDownloadURL()
                        .then(url => {
                            //setUrl(url)
                            //console.log(url) 
                            datapoint.u_answerImg = url 
                            ref.set(datapoint) 
                            Swal.fire({
                                icon: 'success',
                                title: 'Answer Posted',
                                text: 'Your Answer has been sent!',
                                footer: '<a href="">Response has been sent.</a>'
                            })
                            //nav('/myposts')
                            
                        }
                    )
                }
            )
            setAnswer("")
            inputFileName.value = "";
        }
        else {
            ref.set(datapoint);
            Swal.fire({
                icon: 'success',
                title: 'THANKS SENSEI!',
                text: "Answer Posted ",
                footer: '<a href="">Response has been sent.</a>'
            });
            setAnswer("")
        }
    }

    document.body.style.overflow = 'hidden';

    const loc = useLocation();

    const hiddenFileInput = React.useRef(null);

    const handleChange = event => {
        setSelectedImage(event.target.files[0]);
    };

    //user function to return post details
    return (
        <React.Fragment>
            {/* <Navbar/> */}
            <section className="details">
                <div className="userdetails">
                <h1 className="postTitle" style={{ fontFamily: 'sans-serif', fontSize:'30px', textDecoration:'underline' }}>Details</h1><br />
                    <h3>Creator</h3>
                    <p className="postde">{loc.state.my_username} </p>
                    <br/>
                    <h3>Email</h3>
                    <p className="postde">{loc.state.my_email} </p>
                    <br/>
                    <h3>Date Created</h3>
                    <p className="postde">{new Date(loc.state.my_time.seconds * 1000).toLocaleDateString()}</p>
                    <br/>
                    <h3>Time Created</h3>
                    <p className="postde">{new Date(loc.state.my_time.seconds * 1000).toLocaleTimeString()}</p>
                    <br/>
                    <button className="likebtn" onClick={() => uUpVote({u_Downvote:loc.state.my_DownVote , u_Upvote:loc.state.my_UpVote+1 , u_caption:loc.state.my_caption , u_created:loc.state.my_time , u_doc_id:loc.state.my_u_doc_id , u_email:loc.state.my_email, u_id:loc.state.my_uid, u_question:loc.state.my_question, u_username:loc.state.my_username})}>
                        <AiFillLike size={25} color={"#F5F5F5"}/>
                       <h5>{up}</h5> 
                      <h5></h5>
                    </button>
                    <button className="dislikebtn" onClick={() => uDownVote({u_Downvote:loc.state.my_DownVote+1 , u_Upvote:loc.state.my_UpVote , u_caption:loc.state.my_caption , u_created:loc.state.my_time , u_doc_id:loc.state.my_u_doc_id , u_email:loc.state.my_email, u_id:loc.state.my_uid, u_question:loc.state.my_question, u_username:loc.state.my_username})}>
                        <AiFillDislike size={25} color={"#F5F5F5"}/> 
                        <h5>{down}</h5>
                    </button>
                </div>
                <div className="postdetails">
                <h2 className='postsTitle' style={{background:'rgb(0, 33, 65)'}}>POST DETAILS</h2>
                    <h2 style={{marginTop:'20px', textTransform:'uppercase'}}> {loc.state.my_caption} </h2>
                    <hr className="linedivider" />
                    <p> {loc.state.my_question} </p>
                    {u_image !== "" && <img className="post-image"
                        src={u_image}
                        alt="" >
                    </img>}
                    <br/>
                    <h2 className="answerTitle">Answers</h2>
                    <div>
                        {pulled_answers.map((ans) => (
           <div>
            {ans.u_answerImg !== "" && <img className="answer-image"
                        src={ans.u_answerImg}
                        alt="" >
            </img>}
           <p className="answercontainer">
               {ans.u_answer}
           </p>
    {/* answered by details to the posts data from backend */}
           <div className="answerdetails">
               <div className="userA"> 
                   <p className="answerlbl">Answered by: </p>
                   <p className="answerdata">&nbsp;{ans.u_answeredby}</p>
               </div>
               <div className="Adate">
                   <p className="answerlbl">Date: </p>
                   <p className="answerdata">&nbsp;{new Date(ans.u_date.seconds * 1000).toLocaleDateString()}</p>
               </div>
               <div className="Adate">
                   <p className="answerlbl">Time: </p>
                   <p className="answerdata">&nbsp;{new Date(ans.u_date.seconds * 1000).toLocaleTimeString()}</p>
               </div>
           </div>
           <hr className="linedivider" />
       </div>
                        ))}
                    </div>

                    <div className="yourAnswerContainer">
                        <h3>Your Answer</h3>
                        <textarea className="answerbox" value={u_answer} type="answer" onChange={(event) => {
                            setAnswer(event.target.value);

                        }} />
                        <div className='imageUploader'>
                            <h3 className='heading'>Attachment</h3>
                            <input
                                type="file"
                                id="imageFile"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="answerbtn" type="submit" onClick={() => myAnswer({u_answerImg:"", u_id, doc_id, u_username, u_email, u_caption, u_question, u_answer, u_correct: "Not Yet Marked", u_date : new Date(), u_answeredby })} >Answer</button>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default PostDetails;
