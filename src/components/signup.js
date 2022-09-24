import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";

///////////Thabelo and Bongiwe:
import { useState } from "react";
import { v4  as uuidv4 } from 'uuid' ;
import firebase from '../firebase/index' ;
///////////Thabelo and Bongiwe:

const Signup = () => {
  // const firstnameRef = useRef();
  // const lastnameRef = useRef();
//  const studentNumRef = useRef();
  // const facultyRef = useRef();
//  const emailRef = useRef();
//  const usernameRef = useRef();
//  const passwordRef = useRef();
 // const confirmPassRef = useRef();

  const { registerUser } = useUserContext();

//  const onSubmit = (e) => {
//    e.preventDefault();
//    const email = emailRef.current.value;
//    const username = usernameRef.current.value;
//    const password = passwordRef.current.value;
//    if (email && password && username) registerUser(email, password, username);
//  };
  
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
    if (emailRef && passwordRef && usernameRef){

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
      <input placeholder="First Name" type="first" onChange={(event) => setFirstName(event.target.value)} />
      <input placeholder="Last Name" type="last" onChange={(event) => setLastName(event.target.value)} /> 
      <input placeholder="User Name" type="username" onChange={(event) => setUsername(event.target.value)} />
      <input placeholder="Student Number" type="stunum" onChange={(event) => setStudentNum(event.target.value)} />
      <input placeholder="Email" type="email"  onChange={(event) => setEmail(event.target.value)}/>
      <input placeholder="Password" type="password"  onChange={(event) => setPassword(event.target.value)} />
      <input placeholder="Confirm Password" type="password" onChange={(event) => setConfirmPassword(event.target.value)} />
      <button type="submit" onClick={() => handleSubmit({firstnameRef, lastnameRef, studentNumRef, emailRef, usernameRef, passwordRef,  u_id: uuidv4()})}>Register</button>
    </form>
  </div>
);
};

export default Signup;
///////////By Thabelo and Bongiwe

//   return (
//     <div className="form">
//       <h2> Sign Up</h2>
//       <form onSubmit={onSubmit}>
//         {/* <input placeholder="Firstname" type="first" required ref={firstnameRef} />
//         <input placeholder="Lastname" type="last" required ref={lastnameRef} /> */}
//         <input placeholder="Username" type="username" required ref={usernameRef} />
//         <input placeholder="Student number" type="stunum" required ref={studentNumRef} />
//         {/* <input placeholder="Username" type="username" required ref={usernameRef} /> */}
//         <input placeholder="Email" type="email"  required ref={emailRef} />
//         <input placeholder="Password" type="password"  required ref={passwordRef} />
//         <input placeholder="Confirm password" type="password" required ref={confirmPassRef} />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
