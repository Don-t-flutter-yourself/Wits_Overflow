
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


// class PostsT extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             u_caption: '',
//             u_question: '',
//             u_id: '',
          
//         }


//         this.handlerChangeCaption = this.handlerChangeCaption.bind(this) ;
//         this.handlerChangeQuestion = this.handlerChangeQuestion.bind(this) ;
      

//     }

    

//     handlerChangeCaption(event){
//         this.setState({
//             u_caption: event.target.value
//         })
//     }

//     handlerChangeQuestion(event){
//         this.setState({
//             u_question: event.target.value
//         })
//     }

//     //State of Student number will be retrieved from from Users Table?????

    
  


//     render(){
        

//         const ref = firebase.firestore().collection('UserPosts');
//         const{u_caption, u_question } = this.state

//         function handleAddPost(datapoint){   //Where post is the entire object/datapoint
//             ref.doc(datapoint.id)
//             ref.add(datapoint)
//             alert("Question Posted.")
//         }


//         return(
//                 <div>
//                    <div>
//                      <h5><label>Caption : </label> </h5>
//                      <textarea value={u_caption} onChange={this.handlerChangeCaption}></textarea>
//                    </div>

//                    <div>
//                      <h5><label>Question : </label></h5>
//                     <textarea value={u_question} onChange={this.handlerChangeQuestion}></textarea>
//                    </div>

//                    <div>
//                      <button type="post" variant="contained" color="primary" onClick={() => handleAddPost({u_caption, u_question, u_id: uuidv4()})}>Post </button>
//                    </div>
                     
                   
//                 </div>
      
//         )
//     }
// }

// export default PostsT ;


/////////Thabelo :
