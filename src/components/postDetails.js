import React from "react";
import '../styles/postDetails.css';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase/index';

import { app } from '../firebase/index';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app)

const PostDetails = (props) => {

    const doc_id = uuidv4();

    const ref = firebase.firestore().collection('UAnswers').doc(doc_id);

    const [_user, setUser] = useState();

    const [u_answer, setAnswer] = useState();
    const [u_caption, setCaption] = useState('');
    const [u_question, setQuestion] = useState('');
    const [u_email, setEmail] = useState('');
    const [u_username, setUsername] = useState('');
    const [u_id, setId] = useState("");
    const [own_id, setOwnId] = useState('');

    const [pulled_answers, setPulledAnswers] = useState([])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setOwnId(user.uid);
                setCaption(loc.state.my_caption);
                setQuestion(loc.state.my_question);
                setEmail(loc.state.my_email);
                setUsername(loc.state.my_username);
                setId(loc.state.my_uid);

                Pulling(loc.state.my_uid)
                setUser(user)
            }
        })

    }, [])

    function Pulling(d_id) {
        const _ref = firebase.firestore().collection('UAnswers')

        _ref.where('u_id', '==', d_id).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setPulledAnswers(items);
        });
    }

    function myAnswer(datapoint) {
        if (own_id === u_id) {
            alert("Can't answer your own question ");
        } else {
            ref.set(datapoint);
            alert("Posted");
            setAnswer("")
        }
    }
    document.body.style.overflow = 'hidden';

    const loc = useLocation();
    return (
        <React.Fragment>
            <section className="details">
                <div className="userdetails">
                    <h2 className="postTitle" style={{ fontFamily: 'Poppins' }}>Post Details</h2><br />
                    <h5>Post Creator :  {loc.state.my_username} </h5>
                    <h5>Email : {loc.state.my_email} </h5>
                    <h5>Date The Post Was Created : {new Date(loc.state.my_time.seconds * 1000).toLocaleDateString()}</h5>
                    <h5>Time The Post Was Created : {new Date(loc.state.my_time.seconds * 1000).toLocaleTimeString()}</h5>

                </div>
                <div className="postdetails">
                    <h3>Caption  : {loc.state.my_caption}  </h3>
                    <hr className="linedivider" />
                    <p>Question Asked : {loc.state.my_question} </p>
                    <h2 className="answerTitle">Answers</h2>
                    <div>
                        {pulled_answers.map((ans) => (
                            <>
                                <p className="answercontainer">
                                    {ans.u_answer}
                                </p>

                                <div className="answerdetails">
                                    <div className="userA">Answered by: {_user.displayName} </div>
                                    <div className="Adate">Date: {new Date(ans.u_date.seconds * 1000).toLocaleDateString()}</div>
                                    <div className="Adate">Time: {new Date(ans.u_date.seconds * 1000).toLocaleTimeString()}</div>
                                </div>
                                <hr className="linedivider" />
                            </>
                        ))}
                    </div>

                    <div className="yourAnswerContainer">
                        <h3>Your Answer</h3>
                        <textarea className="answerbox" value={u_answer} type="answer" onChange={(event) => {
                            setAnswer(event.target.value);
                        }} />
                        <button className="answerbtn" type="submit" onClick={() => myAnswer({ u_id, doc_id, u_username, u_email, u_caption, u_question, u_answer, u_correct: "Not Yet Marked", u_date : new Date() })} >Answer</button>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default PostDetails;