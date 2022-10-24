import "./profile.css";
import { useNavigate } from "react-router-dom";

import React, { Profiler } from "react";
import firebase from "../firebase/index";

import {BiImageAdd} from "react-icons/bi";

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase/index';

import { storage } from '../firebase/index';

const auth = getAuth(app);

const Profile = () => {
    const [u_username, setUsername] = useState('');
    const [u_id, setId] = useState('');
    const [u_email, setEmail] = useState('');




    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setId(user.uid)
                setEmail(user.email);
                setUsername(user.displayName);
            }
        })

    }, []);

    const [profile, setProfile] = useState([]);
    const prof = firebase.firestore().collection("Users");

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

    const [friends, setFriends] = useState([]);
    const fr = firebase.firestore().collection("Friends");
    function getFriendReq() {
        fr.where('requestedBy_Email', '==', u_email).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setFriends(items);
        })
    }

    useEffect(() => {
        getFriendReq();
    });

    const nav = useNavigate();

    const handleBack = () => {
        nav(-1);
    }

    const hiddenFileInput = React.useRef(null);
    const [postimage, setSelectedImage] = useState('')
    
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        setSelectedImage(event.target.files[0]);
    };



    return (
        <React.Fragment>
            <section className="profilePage">
                <div className="leftprofile">
                    <h1 className="profileTitle">Profile</h1>
                    <div className="imgContainer">
                        <div>
                         {!postimage && <img
                            className="defaultImg"
                            src="https://th.bing.com/th/id/R.77f5794e2eb49f7989b8f85e92cfa4e0?rik=FPingw5xw%2fAHXA&pid=ImgRaw&r=0"
                            alt=""
                        />} 
                         {postimage && <img
                            className="selectedImg"
                            src={URL.createObjectURL(postimage)}
                            alt="not found"
                        />} 
                       
                        </div>
                        <button className="imgSelector" onClick={handleClick}>
                            <BiImageAdd className="addImgIcon" size={25} color={"#F5F5F5"}/>
                        </button>
                        <input
                            style={{display:'none'}}
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                        />
                    </div>
                    {profile.map((myprofile) => (
                    <div className="proDetails">
                        <div key={myprofile.users_doc_id}>
                        
                       <h3> Username:  <input className="proInputUname" placeholder={u_username}/> </h3>
                       <h3> Firstname: <input className="proInputFname" placeholder={myprofile.firstnameRef}/> </h3>
                       <h3> Lastname: <input className="proInputLname" placeholder={myprofile.lastnameRef}/> </h3>
                       <h3> Student Number: <input className="proInputSnum" placeholder={myprofile.studentNumRef}/> </h3>
                       <h3> Email Address: <input className="proInputEmail" placeholder={u_email}/> </h3>
                       <h3> Date Created: {new Date(myprofile.u_created.seconds * 1000).toLocaleDateString()}</h3><br/>
                       <h3> Time Created: {new Date(myprofile.u_created.seconds * 1000).toLocaleTimeString()}</h3><br/>
                       <button>Submit</button>
                       </div>
                    </div>

                    ))}
                </div>
                
                {friends.map((myfriend) => (
                <div className="rightprofile">
                    <div className="friendBox">
                        <img style={{width:"80px", margin:"40px 0px 20px 0px", borderRadius:"40px"}} src="https://th.bing.com/th/id/R.77f5794e2eb49f7989b8f85e92cfa4e0?rik=FPingw5xw%2fAHXA&pid=ImgRaw&r=0"/>
                        <h2>Username - {myfriend.requestTo_name}</h2>
                        <h3>Student Number - {myfriend.requestTo_STN}</h3>
                        <button className="viewbtn">View</button>
                    </div>
                </div>
                 ))}

            </section>
        </React.Fragment>
    );
}

export default Profile;

