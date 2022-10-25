import "./profile.css";
import { useNavigate } from "react-router-dom";

import React, { Profiler } from "react";
import firebase from "../firebase/index";

import { BiImageAdd } from "react-icons/bi";

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

    document.body.style.overflow = 'hidden';

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
                            <BiImageAdd className="addImgIcon" size={25} color={"#F5F5F5"} />
                        </button>
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                        />
                    </div>
                    {/* {profile.map((myprofile) => (
                        <div className="proDetails">
                            <div key={myprofile.users_doc_id}>

                                <h5> Username:  <input className="proInputUname" placeholder={u_username} /> </h5>
                                <h5> Firstname: <input className="proInputFname" placeholder={myprofile.firstnameRef} /> </h5>
                                <h5> Lastname: <input className="proInputLname" placeholder={myprofile.lastnameRef} /> </h5>
                                <h5> Student Number: <input className="proInputSnum" placeholder={myprofile.studentNumRef} /> </h5>
                                <h5> Email Address: <input className="proInputEmail" placeholder={u_email} /> </h5>
                                <div style={{ paddingTop: '20px', fontSize: '14px' }}>
                                    <span style={{ fontWeight: 'bold', marginRight: '100px' }}> Date created: {new Date(myprofile.u_created.seconds * 1000).toLocaleDateString()}</span>
                                    <span style={{ fontWeight: 'bold' }}> Time created: {new Date(myprofile.u_created.seconds * 1000).toLocaleTimeString()}</span>
                                </div>
                                <button className="btn">Submit</button>
                            </div>
                        </div>

                    ))} */}
                </div>


                <div className="rightprofile">
                    <h1 className="profileTitle" style={{ marginTop: "-30px" }}>Friends</h1>

                    {friends.map((myfriend) => (
                        <div className="friendBox">
                            <img className="friendPhoto" src="https://th.bing.com/th/id/R.77f5794e2eb49f7989b8f85e92cfa4e0?rik=FPingw5xw%2fAHXA&pid=ImgRaw&r=0" />
                            <div className="friendDet">
                                <h4>Username: {myfriend.requestTo_name}</h4>
                                <h4>Student Number: {myfriend.requestTo_STN}</h4>
                            </div>
                            {/* <button className="viewbtn">View</button> */}
                        </div>
                    ))}
                </div>


            </section>
        </React.Fragment>
    );
}

export default Profile;

