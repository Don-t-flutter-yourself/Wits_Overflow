import React from "react";
import { useUserContext } from "../context/userContext";
import '../styles/signup.css';
import { useState } from "react";
import { v4  as uuidv4 } from 'uuid' ;
import firebase from '../firebase/index' ;
import Swal from "sweetalert2";
const Signup = () => {

  const { registerUser } = useUserContext();


  const [firstnameRef, setFirstName] = useState('') ;
  const [lastnameRef, setLastName] = useState('') ;
  const [studentNumRef, setStudentNum] = useState('') ;
  const [emailRef, setEmail] = useState('') ;
  const [usernameRef, setUsername] = useState('') ;
  const [passwordRef, setPassword] = useState('') ;
  const [confirmPassRef, setConfirmPassword] = useState('') ;

  const users_doc_id = uuidv4() ;
  const ref = firebase.firestore().collection('Users').doc(users_doc_id);

  
   function handleSubmit(datapoint){
   // if (emailRef && passwordRef && usernameRef && passwordRef){
       if(firstnameRef.length < 2){
        Swal.fire({
          icon: 'error',
          title: 'Check First Name?',
          text: 'Name too short',
          footer: '<a href="">Enter name not initials.</a>'
        });
       
       }else if(lastnameRef.length <2){
        Swal.fire({
          icon: 'error',
          title: 'Check Surname ',
          text: 'Surname to short',
          footer: '<a href="">Enter name not initials.</a>'
        });
       }else if(usernameRef.length <3){
        Swal.fire({
          icon: 'error',
          title: 'Check Username  ',
          text: 'Username too short!',
          footer: '<a href="">please select longer than 3 letters.</a>'
        });
        
       }else if(studentNumRef.length < 7){
        Swal.fire({
          icon: 'error',
          title: 'Check Student Number',
          text: 'Student Number should be seven digits',
          footer: '<a href="">Contact admin for further help.</a>'
        });
        
       }else if(emailRef !== `${studentNumRef}@students.wits.ac.za`){
        Swal.fire({
          icon: 'error',
          title: 'Check Email Format',
          text: 'Email should be STUDENTNUMBER.students.wits.ac.za',
          footer: '<a href="">Register new email with WITS if lacking.</a>'
        });

       }else if(passwordRef < 6 && passwordRef !== confirmPassRef){
        Swal.fire({
          icon: 'error',
          title: 'Check your password',
          text: 'Either your password is short or it doesnt match your confirm password!',
          footer: '<a href="">Reset Password if unsure.</a>'
        });
       }else{
        registerUser(emailRef, passwordRef, usernameRef);
        ref.set(datapoint)
        Swal.fire({
          icon: 'success',
          title: 'Registered',
          text: 'Your new Account has been created!',
          footer: '<a href="">You have been automatically logged in.</a>'
        });

       }
  }
// describes how the sign up form looks like, the text fields and buttons
 return (
  <div className="formS">
    <h2 className="suh"> Sign Up</h2>
    <form >
       <input placeholder="First Name - Three or more letters" type="first" onChange={(event) => setFirstName(event.target.value)} />
      <input placeholder="Last Name - Three or more letters" type="last" onChange={(event) => setLastName(event.target.value)} /> 
      <input placeholder="User Name - Three or more letters" type="username" onChange={(event) => setUsername(event.target.value)} />
      <input placeholder="Student Number - Seven Digits" type="stunum" onChange={(event) => setStudentNum(event.target.value)} />
      <input placeholder="Email - STUDENTNUMBER@students.wits.ac.za" type="email"  onChange={(event) => setEmail(event.target.value)}/>
      <input placeholder="Password - Six or more letters" type="password"  onChange={(event) => setPassword(event.target.value)} />
      <input placeholder="Confirm Password Six or more letters" type="password" onChange={(event) => setConfirmPassword(event.target.value)} />
      <button className="signupbtn" type="submit" onClick={() => handleSubmit({u_image:"", users_doc_id, firstnameRef, lastnameRef, studentNumRef, emailRef, usernameRef, passwordRef, u_created: new Date(),  u_id: uuidv4()})}>Register</button>       
   
    </form>
  </div>
);
};

export default Signup;
