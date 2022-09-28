import React, { useState, useEffect } from 'react'
import firebase from '../firebase/index' 


function ATP(){

    const [answers, setAnswers] = useState([]) ;

    const ref = firebase.firestore().collection("UAnswers");
 
    function AllAnswers(){
        ref.onSnapshot((querySnapshot) => { 
            const items = [] ;
            querySnapshot.forEach((doc) => {items.push(doc.data()) ;
            }) ;
            setAnswers(items) ;
        }) ;
    }

    useEffect(() => { AllAnswers() }, []) ;

    return(
        <div>
            <h1>Posts-And-Answers</h1>
             
             {answers.map((answer) => (
                 <div key= {answer.doc_id}> 
                 {/* <Container maxWidth="lg" style={{backgroundColor:"whitesmoke"}}>    */}
                     <h5>Question - </h5>
                     <p> {answer.u_question}</p>
                     <h5>Answer - {answer.u_answer}</h5>
                     <h5>Status - {answer.u_correct}</h5>
                 {/* </Container> */}
                 </div>
             ))}
        
   

        </div>
    )
}

export default ATP ;