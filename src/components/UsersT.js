import React, { useState, useEffect } from 'react'
import firebase from '../firebase/index'
import '../styles/Users.css';
import { v4  as uuidv4 } from 'uuid' ;
import Swal from "sweetalert2";
import { app } from '../firebase/index';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);
//function to get users from database
function UsersT() {
    const [allUsers, setUsers] = useState([]);
    const ref = firebase.firestore().collection("Users");
    const [searchQuery, setSearch] = useState('');

    // const [myFriends, setFriends] = useState([]);
    // const refF = firebase.firestore().collection("Friends");

    const [requestedBy_Email, setMyemail] = useState('');
    const [requestedBy_id, setMyId] = useState('');
   // const [requestedBy_Usernane, setUsername] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setMyId(user.uid)
                setMyemail(user.email)
                //setUsername(user.displayName);
            }
        })
    }, []);
//getting all users
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
//friend function to get your added friends from database when requesting
    const friend_doc_id = uuidv4() ;
    const ref2 = firebase.firestore().collection('Friends').doc(friend_doc_id) ;
    function handleAddFriend(friend,user){
        ref2.set(friend)
        user.u_friends = friend.requestedBy_Email
        ref.doc(user.users_doc_id).update(user) 

        // alert("Friend Request Added")
        Swal.fire({
            icon: 'success',
            title: 'ADDED',
            text: 'New user Added as Friend.',
            
          })
    }
//return user page with search for users implemented
    return (
        <React.Fragment>
            <section>
                <div className='usersPage'>
                    <h2 className='usersTitle'>All Users</h2>
                    <div className="userSearch">
                        <input placeholder="Search user" type="text" onChange={(e) => setSearch(e.target.value)} value={searchQuery} />
                    </div>
                    {allUsers.filter((user) => {
                        if (searchQuery === '') {
                            return user
                        }

                        if (user.studentNumRef.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) {
                            return user
                        }
                    })
                    .map((user) => (

                        <div key={user.studentNumRef}>
                            {user.u_friends!==requestedBy_Email && <div className='userBox'>
                                <img className='userImage'
                                    src="https://th.bing.com/th/id/R.77f5794e2eb49f7989b8f85e92cfa4e0?rik=FPingw5xw%2fAHXA&pid=ImgRaw&r=0"
                                />
                                <div className='usersDet'>
                                    <h3 className='userN'>{user.usernameRef}</h3>
                                    <h4 className='firstN'>{user.firstnameRef} {user.lastnameRef} </h4>
                                    <h4 className='studentN'>{user.studentNumRef}</h4>
                                </div>
                                <button className='friendbtn' onClick={() => handleAddFriend({requestedBy_Email, requestedBy_id, requestTo_u_id: user.u_id, requestTo_name: user.firstnameRef, requestTo_STN: user.studentNumRef, requestTo_Username: user.usernameRef},
                                    {users_doc_id: user.users_doc_id, emailRef: user.emailRef, firstnameRef: user.firstnameRef, lastnameRef: user.lastnameRef, passwordRef: user.passwordRef, studentNum: user.studentNumRef, u_created: user.u_created, u_id: user.u_id,
                                        u_image: user.u_image, usernameRef: user.usernameRef, u_friends: user.u_friends}
                                    )}
                                    > Add Friend </button>
                            </div>}

                            {user.u_friends===requestedBy_Email && <div className='userBox'>
                                <img className='userImage'
                                    src="https://th.bing.com/th/id/R.77f5794e2eb49f7989b8f85e92cfa4e0?rik=FPingw5xw%2fAHXA&pid=ImgRaw&r=0"
                                />
                                <div className='usersDet'>
                                    <h3 className='userN'>{user.usernameRef}</h3>
                                    <h4 className='firstN'>{user.firstnameRef} {user.lastnameRef} </h4>
                                    <h4 className='studentN'>{user.studentNumRef}</h4>
                                </div>
                                <button className='friendbtn' disabled={true}> Friend </button>
                            </div>}
                        </div>
                    ))}

                </div>
            </section>
        </React.Fragment>
    )
}

export default UsersT;


