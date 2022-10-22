import "./profile.css";
import { useNavigate } from "react-router-dom";

import React, { Profiler } from "react";
import firebase from "../firebase/index";

import {BiImageAdd} from "react-icons/bi";

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase/index';

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

    const nav = useNavigate();

    const handleBack = () => {
        nav(-1);
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const hiddenFileInput = React.useRef(null);
    
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
                        {!selectedImage && <img
                            className="defaultImg"
                            src="https://th.bing.com/th/id/R.77f5794e2eb49f7989b8f85e92cfa4e0?rik=FPingw5xw%2fAHXA&pid=ImgRaw&r=0"
                            alt=""
                        />}
                        {selectedImage && <img
                            className="selectedImg"
                            src={URL.createObjectURL(selectedImage)}
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
                       <h3> Username:  <input className="proInputUname" placeholder={u_username}/> </h3>
                       <h3> Firstname: <input className="proInputFname" placeholder={myprofile.firstnameRef}/> </h3>
                       <h3> Lastname: <input className="proInputLname" placeholder={myprofile.lastnameRef}/> </h3>
                       <h3> Student Number: <input className="proInputSnum" placeholder={myprofile.studentNumRef}/> </h3>
                       <h3> Email Address: <input className="proInputEmail" placeholder={u_email}/> </h3>
                       <h3> Date Created: {new Date(myprofile.u_created.seconds * 1000).toLocaleDateString()}</h3><br/>
                       <h3> Time Created: {new Date(myprofile.u_created.seconds * 1000).toLocaleTimeString()}</h3><br/>
                       <button>Submit</button>
                    </div>
                    ))}
                </div>

                <div className="rightprofile">
                    <div>
                        <img/>
                        <p>Username</p>
                        <p>Student Number</p>
                        <button>View</button>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Profile;

