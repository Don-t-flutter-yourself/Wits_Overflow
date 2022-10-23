import React, { useState, useEffect } from 'react'
import firebase from '../firebase/index'
import '../styles/Users.css';

function UsersT() {
    const [allUsers, setUsers] = useState([]);
    const ref = firebase.firestore().collection("Users");

    function AllUsers() {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setUsers(items);
        });
    }

    useEffect(() => { AllUsers() }, []);

    const [addFriend, setAddFriend] = useState();
    const handleAddFriend = () => {
        setAddFriend(!addFriend);
    };

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
                                <button className='friendbtn' onClick={handleAddFriend}> {addFriend ? "Friend" : "Add Friend"} </button>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </React.Fragment>
    )
}

export default UsersT;


