import React, { useState, useEffect } from 'react'
import firebase from '../firebase/index'
//import {Container} from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import '../styles/AllPosts.css';

function AllPostsT() {
    const [posts, setPosts] = useState([]);
    const [value, setVal] = useState('');

    useEffect(() => {
        if (value.length > 0){
            let searchQuery = value.toLocaleLowerCase();
            for (let i=0; i<posts.length; ++i){
                let ipost = posts[i];
                if (ipost.u_caption.toLocaleLowerCase().slice(0, searchQuery.length).indexOf(searchQuery) !== -1){
                    console.log(ipost.u_question);
                }
            }
        }
    }, [value])

    const ref = firebase.firestore().collection("UserPosts");

    const nav = useNavigate();

    function AllPosts() {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setPosts(items);
        });
    }

    useEffect(() => { AllPosts() }, []);

    function onPost(mystate) {
        nav('/details', {
            state: {
                my_question: mystate.u_question,
                my_caption: mystate.u_caption,
                my_email: mystate.u_email,
                my_username: mystate.u_username,
                my_uid: mystate.u_id,
                my_time: mystate.u_created,
                my_u_doc_id: mystate.u_doc_id, 
                my_UpVote: mystate.u_Upvote,
                my_DownVote: mystate.u_Downvote
            }
        })

    }

    function onAnswer(mystate2) {
        nav('/answer', {
            state: {
                my_question: mystate2.u_question,
                my_caption: mystate2.u_caption,
                my_email: mystate2.u_email,
                my_username: mystate2.u_username,
                my_uid: mystate2.u_id,
                my_time: mystate2.u_created,
                my_u_doc_id: mystate2.u_doc_id, 
                my_UpVote: mystate2.u_Upvote,
                my_DownVote: mystate2.u_Downvote
            }
        })
    }


    return (
        <React.Fragment>
            <section className="details">
                <div className='sideBlock'></div>
                <div className='postsPage'>
                    <div className="search">
                        <input placeholder="search post" type="text" onChange={(e) => setVal(e.target.value)} value={value}/>
                    </div>

                    <h2 className='postsTitle'>ALL POSTS</h2>

                    {posts.map((post) => (
                        <div className='questionContainer' key={post.u_id}>
                            {/* <Container maxWidth="lg" style={{backgroundColor:"whitesmoke"}}> */}
                            {/* <h5> ID : {post.u_id}</h5>     */}
                            <h3>Caption :  {post.u_caption}</h3>
                            <h4>Question - </h4>
                            <p> {post.u_question}</p>
                            <button className='allpostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote ,u_doc_id : post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                                View in detail
                            </button>
                            <hr className='linedivider'/>
                            {/* <button type="details" variant="contained" color="primary" onClick={() => onAnswer({u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })} >
                        Answer Question
                    </button> */}
                            {/* </Container> */}
                        </div>
                    ))}
                </div>
            </section>
        </React.Fragment>
    )
}

export default AllPostsT;


