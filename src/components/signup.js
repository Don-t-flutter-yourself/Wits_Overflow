import React from "react";
import { useUserContext } from "../context/userContext";
import '../styles/signup.css';
import { useState } from "react";
import { v4  as uuidv4 } from 'uuid' ;
import firebase from '../firebase/index' ;

const Signup = () => {

  const { registerUser } = useUserContext();

  
  ///////Thabelo and Bongiwe:
  const [firstnameRef, setFirstName] = useState('') ;
  const [lastnameRef, setLastName] = useState('') ;
  const [studentNumRef, setStudentNum] = useState('') ;
  const [emailRef, setEmail] = useState('') ;
  const [usernameRef, setUsername] = useState('') ;
  const [passwordRef, setPassword] = useState('') ;
  const [confirmPassRef, setConfirmPassword] = useState('') ;

  const ref = firebase.firestore().collection('Users');

  
   function handleSubmit(datapoint){
   // if (emailRef && passwordRef && usernameRef && passwordRef){
       if(firstnameRef.length < 3){
        alert(`Name to short`) ;
       }else if(lastnameRef.length <3){
        alert(`Surname to short`)
       }else if(usernameRef.length <3){
        alert(`Surname to short`)
       }else if(studentNumRef.length < 7){
        alert(`Student Number should be seven digits`)
       }else if(emailRef !== `${studentNumRef}@students.wits.ac.za`){
        alert(`Email should be STUDENTNUMBER.students.wits.ac.za`)
       }else if(passwordRef < 6 && passwordRef !== confirmPassRef){
        alert(`Either your password is short or it doesnt match your confirm password`) 
       }else{
        registerUser(emailRef, passwordRef, usernameRef);
        ref.doc(datapoint.id)
        ref.add(datapoint)
        alert("Registered.")

       }
  }
///////Thabelo and Bongiwe
  
  /////////////By Thabelo and Bongiwe
 return (
  <div className="form">
    <h2> Sign Up</h2>
    <form >
       <input placeholder="First Name - Three or more letters" type="first" onChange={(event) => setFirstName(event.target.value)} />
      <input placeholder="Last Name - Three or more letters" type="last" onChange={(event) => setLastName(event.target.value)} /> 
      <input placeholder="User Name - Three or more letters" type="username" onChange={(event) => setUsername(event.target.value)} />
      <input placeholder="Student Number - Seven Digits" type="stunum" onChange={(event) => setStudentNum(event.target.value)} />
      <input placeholder="Email - STUDENTNUMBER@students.wits.ac.za" type="email"  onChange={(event) => setEmail(event.target.value)}/>
      <input placeholder="Password - Six or more letters" type="password"  onChange={(event) => setPassword(event.target.value)} />
      <input placeholder="Confirm Password Six or more letters" type="password" onChange={(event) => setConfirmPassword(event.target.value)} />
      <button type="submit" onClick={() => handleSubmit({firstnameRef, lastnameRef, studentNumRef, emailRef, usernameRef, passwordRef, u_created: new Date(),  u_id: uuidv4()})}>Register</button>       
   
    </form>
  </div>
);
};

export default Signup;