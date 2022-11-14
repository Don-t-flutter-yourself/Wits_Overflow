import React from "react";
import '../styles/postDetails.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase/index';
import { app } from '../firebase/index';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";


//commented out part of the code to be used in the next sprint
const auth = getAuth(app)

const AdminDelete = () => {
    const [_user, setUser] = useState();
    const [u_created, setCreated] = useState();
    const [u_answer, setAnswer] = useState();
    const [u_caption, setCaption] = useState('');
    const [u_question, setQuestion] = useState('');
    const [u_email, setEmail] = useState('');
    const [u_username, setUsername] = useState('');
    const [u_id, setId] = useState("");
    const [u_doc_id, setDoc] = useState('');
    const [u_image, setImage] = useState();

    const [u_answeredby, setName] = useState('');

    const [pulled_answers, setPulledAnswers] = useState([]);

   
    const nav = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setName(user.displayName);
             
                setCaption(loc.state.my_caption);
                setQuestion(loc.state.my_question);
                setEmail(loc.state.my_email);
                setUsername(loc.state.my_username);
                setId(loc.state.my_uid);
                setCreated(loc.state.my_time)
                setImage(loc.state.my_image)
                Pulling(loc.state.my_question)
                setUser(user)
                setDoc(loc.state.my_u_doc_id)
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

    function mydelete(){
        const ref = firebase.firestore().collection('UserPosts')
        //const _ref = firebase.firestore().collection('UAnswers')  //use to delete post answers when deleting the post
        ref.doc(u_doc_id).delete();
        nav(-1);
    }

    function deleteAns(ans){
        const _ref = firebase.firestore().collection('UAnswers')
        //alert(ans.doc_id);
        _ref.doc(ans.doc_id).delete();
    }

    document.body.style.overflow = 'hidden';

    const loc = useLocation();


    //user function to return post details
    return (
        <React.Fragment>
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
                    {/* <button className="likebtn" onClick={() => uUpVote({u_Downvote:loc.state.my_DownVote , u_Upvote:loc.state.my_UpVote+1 , u_caption:loc.state.my_caption , u_created:loc.state.my_time , u_doc_id:loc.state.my_u_doc_id , u_email:loc.state.my_email, u_id:loc.state.my_uid, u_question:loc.state.my_question, u_username:loc.state.my_username})}>
                        <AiFillLike size={25} color={"#F5F5F5"}/>
                        <h5>{up}</h5>
                    </button>
                    <button className="dislikebtn" onClick={() => uDownVote({u_Downvote:loc.state.my_DownVote+1 , u_Upvote:loc.state.my_UpVote , u_caption:loc.state.my_caption , u_created:loc.state.my_time , u_doc_id:loc.state.my_u_doc_id , u_email:loc.state.my_email, u_id:loc.state.my_uid, u_question:loc.state.my_question, u_username:loc.state.my_username})}>
                        <AiFillDislike size={25} color={"#F5F5F5"}/> 
                        <h5>{down}</h5>
                    </button> */}
                    <button className='backbtn' onClick={() => nav(-1)}>Back</button>
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
           <p className="answercontainer">
               {ans.u_answer}
           </p>
    {/* answered by details to the posts data from backend */}
           <div className="answerdetails">
               <div className="uAns"> 
                   <p className="answerlbl">Answered by: </p>
                   <p className="answerdata">&nbsp;{ans.u_answeredby}</p>
               </div>
               <div className="ansDate">
                   <p className="answerlbl">Date: </p>
                   <p className="answerdata">&nbsp;{new Date(ans.u_date.seconds * 1000).toLocaleDateString()}</p>
               </div>
               <div className="ansTime">
                   <p className="answerlbl">Time: </p>
                   <p className="answerdata">&nbsp;{new Date(ans.u_date.seconds * 1000).toLocaleTimeString()}</p>
               </div>
               <button className="delAns" type="submit" onClick={() => deleteAns(ans)} >Remove Answer</button>
           </div>
           <hr className="linedivider" />
       </div>
                        ))}
                    </div>

                    <div className="yourAnswerContainer">
                        <button className="delbtn" type="submit" onClick={() => mydelete()} >Delete Post</button>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default AdminDelete;