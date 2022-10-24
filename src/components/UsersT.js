import React, { useState, useEffect } from 'react'
import firebase from '../firebase/index'
import '../styles/Users.css';
import { v4  as uuidv4 } from 'uuid' ;

import { app } from '../firebase/index';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(app);

function UsersT() {
    const [allUsers, setUsers] = useState([]);
    const ref = firebase.firestore().collection("Users");

    const [requestedBy_Email, setMyemail] = useState('');
    const [requestedBy_id, setMyId] = useState('');
    const [requestedBy_Usernane, setUsername] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setMyId(user.uid)
                setMyemail(user.email)
                setUsername(user.displayName);
            }
        })
    }, []);

    function AllUsers() {
        ref.where('emailRef', '!=', requestedBy_Email).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setUsers(items);
        })
    }

    useEffect(() => {
        AllUsers();
    });



    const friend_doc_id = uuidv4() ;
    const ref2 = firebase.firestore().collection('Friends').doc(friend_doc_id) ;
    function handleAddFriend(friend){
        ref2.set(friend)
        
        alert("Friend Request Added")
    }

    return (
        <React.Fragment>
            <section>
                <div className='usersPage'>
                    <h2 className='usersTitle'>All Users</h2>
                    {allUsers.map((user) => (

                        <div key={user.studentNumRef}>
                            <div className='userBox'>
                                <img className='userImage'
                                    src="https://th.bing.com/th/id/R.77f5794e2eb49f7989b8f85e92cfa4e0?rik=FPingw5xw%2fAHXA&pid=ImgRaw&r=0"
                                />
                                <div className='usersDet'>
                                    <h3 className='userN'>{user.usernameRef}</h3>
                                    <h4 className='firstN'>{user.firstnameRef} {user.lastnameRef} </h4>
                                    <h4 className='studentN'>{user.studentNumRef}</h4>
                                </div>
                                <button className='friendbtn' onClick={() => handleAddFriend({requestedBy_Email, requestedBy_id, requestTo_u_id: user.u_id, requestTo_name: user.firstnameRef, requestTo_STN: user.studentNumRef, requestTo_Username: user.usernameRef})}>Add Friend </button>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </React.Fragment>
    )
}

export default UsersT;


