import "./profile.css";
import { useNavigate } from "react-router-dom";

/////////Thabelo:
import React from "react";


import { useEffect, useState } from 'react';
import {getAuth , onAuthStateChanged} from "firebase/auth" ;
import { app } from '../firebase/index' ;

const auth = getAuth(app) ;

//////////Thabelo:

const Profile = () => {
///////////Thabelo:
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
    
 /////////Thabelo:

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
                <h3> Username: {u_username}  </h3>
                <h3> Firstname: </h3>
                <h3> Lastname: </h3>
                <h3> Student Number: </h3>
                <h3> Email Address: {u_email} </h3>
                <h3> Date Created: </h3>
                <button className='profilebtn' onClick={handleBack}> back </button>
            </div>
        </div>
    );
}
 
export default Profile;

