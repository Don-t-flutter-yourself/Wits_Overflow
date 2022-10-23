import React, { useState, useEffect } from 'react'
import firebase from '../firebase/index'
//import {Container} from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import '../styles/AllPosts.css';



//commented out part of the code to be used in the next sprint


function AllPostsT() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearch] = useState('');

    // useEffect(() => {
    //     if (value.length > 0){
    //         let searchQuery = value.toLocaleLowerCase();
    //         for (let i=0; i<posts.length; ++i){
    //             let ipost = posts[i];
    //             if (ipost.u_caption.toLocaleLowerCase().slice(0, searchQuery.length).indexOf(searchQuery) !== -1){
    //                 console.log(ipost.u_question);
    //             }
    //         }
    //     }
    // }, [value])

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
//details of the post gotten by data fetching
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
//answer details
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

    document.body.style.overflow = 'hidden';

    return (
        <React.Fragment>
            <section className="details">
                <div className='sideBlock'>
                   <button className='posbtn' onClick={() => nav('/createposts')}>Create Post</button>
                </div>
                <div className='postsPage'>
                    <h2 className='postsTitle'>ALL POSTS</h2>

                    <div className="search">
                        <input placeholder="search post" type="text" onChange={(e) => setSearch(e.target.value)} value={searchQuery}/>
                    </div>

                    {posts.filter((post) => {
                        if (searchQuery == ''){
                            return post
                        }else if (post.u_question.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())){
                            return post
                        }
                    })
                    .map((post) => (
                        <div className='questionContainer' key={post.u_id}>
                        <h1 style={{fontFamily: 'sans-serif', textTransform:'uppercase',color:'rgba(125,125,125,1)'}}>{post.u_caption}</h1>
                        <h4 style={{ marginTop:'10px', fontSize:'22px', color:'rgb(0, 33, 65)'}}>Question </h4>
                        <p style={{color:'gray'}}>📖 {'Category'}</p>
                        <p> {post.u_question}</p>
                        <button className='allpostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote ,u_doc_id : post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                            View in detail
                        </button>
                        <p>{post.my_time}</p>
                        <hr className='linedivider'/>
                        </div>
                    ))}
                </div>
            </section>
        </React.Fragment>
    )
}

export default AllPostsT;