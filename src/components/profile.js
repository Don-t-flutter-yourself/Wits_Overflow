import "./profile.css";
import { useNavigate } from "react-router-dom";

import React, { Profiler } from "react";
import firebase from "../firebase/index";


import { useEffect, useState } from 'react';
import {getAuth , onAuthStateChanged} from "firebase/auth" ;
import { app } from '../firebase/index' ;

const auth = getAuth(app) ;


const Profile = () => {
    const [u_username, setUsername] = useState('') ;
    const [u_id, setId] = useState('') ;
    const [u_email, setEmail] = useState('') ;

    
    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if(user){
               setId(user.uid)
               setEmail(user.email) ;
               setUsername(user.displayName) ;
            }
        })

 },[]);

 const [profile, setProfile] = useState([]) ;
 const prof = firebase.firestore().collection("Users") ;

 function getProfile() {
     prof.where('emailRef', '==', u_email).where('usernameRef', '==', u_username).onSnapshot((querySnapshot) => {
         const items = [];
         querySnapshot.forEach((doc) => {
             items.push(doc.data());
         });
         setProfile(items);
     })
 }

 useEffect(() => {
     getProfile();
 });



    const nav = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleBack = () => {
        nav(-1);
    }

    return ( 
        <div className="profile">
            <div className="upper-container">
                <h1 className='profileTitle'>Profile</h1>
                {/* <div className="image-container">
                {!selectedImage && <img src="https://th.bing.com/th/id/R.77f5794e2eb49f7989b8f85e92cfa4e0?rik=FPingw5xw%2fAHXA&pid=ImgRaw&r=0" alt="" height="100px" width="100px" /> }
                    {!selectedImage &&
                    <input
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                        }}
                    />}
                    {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="not found" height="100px" width="100px"/>}
                </div> */}
            </div>
            <div className="lower-container">
                {/* <h3> { username } : { stuNo }</h3>
                <h4> { email } </h4>
                <h5> { } </h5> */}
                 {profile.map((myprofile) => (
                    <div>
                    <h3> Username: {u_username}  </h3><br/>
                    <h3> Firstname: {myprofile.firstnameRef}</h3><br/>
                    <h3> Lastname: {myprofile.lastnameRef}</h3><br/>
                    <h3> Student Number: {myprofile.studentNumRef}</h3><br/>
                    <h3> Email Address: {u_email} </h3><br/>
                    <h3> Date Created: {new Date(myprofile.u_created.seconds * 1000).toLocaleDateString()}</h3><br/>
                    <h3> Time Created: {new Date(myprofile.u_created.seconds * 1000).toLocaleTimeString()}</h3><br/>
                    <button className='profilebtn' onClick={handleBack}> back </button>
                    </div>
                 ))} ;
               
            </div>
        </div>
    );
}
 
export default Profile;

