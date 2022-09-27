///////Thabelo:

import React, { useState, useEffect } from 'react'
import firebase from '../firebase/index' 
//import {Container} from '@material-ui/core';
import { useNavigate } from "react-router-dom";


function AllPostsT() {
    const [posts, setPosts] = useState([]) ;

    const ref = firebase.firestore().collection("UserPosts");

    const nav = useNavigate();

    function AllPosts(){
        ref.onSnapshot((querySnapshot) => { 
            const items = [] ;
            querySnapshot.forEach((doc) => {items.push(doc.data()) ;
            }) ;
            setPosts(items) ;
        }) ;
    }

    useEffect(() => { AllPosts() }, []) ;

    ///////////Thabelo:
    function onPost(mystate){
        nav('/details', {
            state:{
                my_question: mystate.u_question,
                my_caption: mystate.u_caption,
                my_email: mystate.u_email,
                my_username: mystate.u_username,
                my_uid: mystate.u_id,
                my_time: mystate.u_created
            }
        })
   
    }

    function onAnswer(mystate2){
        nav('/answer', {
            state:{
                my_question: mystate2.u_question,
                my_caption: mystate2.u_caption,
                my_email: mystate2.u_email,
                my_username: mystate2.u_username,
                my_uid: mystate2.u_id,
                my_time: mystate2.u_created
            }
        } )
    }

    //////////////Thabelo:

    return (
        <div>
             <h2>ALL POSTS</h2>
             
            {posts.map((post) => (
                <div key= {post.u_id}> 
                {/* <Container maxWidth="lg" style={{backgroundColor:"whitesmoke"}}> */}
                    <h5> ID : {post.u_id}</h5>    
                    <h5>Caption :  {post.u_caption}</h5>
                    <h5>Question - </h5>
                    <p> {post.u_question}</p>
                    <button type="details" variant="contained" color="primary" onClick={() => onPost({u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created }) }>
                        View in detail
                    </button>
                    <button type="details" variant="contained" color="primary" onClick={() => onAnswer({u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })} >
                        Answer Question
                    </button>
                {/* </Container> */}
                </div>
            ))}
       
  
          
        </div>
      
     
           

        
        
  )

}

export default AllPostsT ;


///////Thabelo: