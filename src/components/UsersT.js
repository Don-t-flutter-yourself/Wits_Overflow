import React, { useState, useEffect } from 'react'
import firebase from '../firebase/index' 
//import {Container} from '@material-ui/core'

function UsersT(){
    const [allUsers, setUsers] = useState([]) ;
    const ref = firebase.firestore().collection("Users");

    function AllUsers(){
        ref.onSnapshot((querySnapshot) => { 
            const items = [] ;
            querySnapshot.forEach((doc) => {items.push(doc.data()) ;
            }) ;
            setUsers(items) ;
        }) ;
    }

    useEffect(() => { AllUsers() }, []) ;

    return(
        <div>
              <h2>All Students</h2>
              {allUsers.map((user) => (
                <>
                <div key= {user.studentNumRef}> 
                {/* <Container maxWidth="lg" style={{backgroundColor:"whitesmoke"}}> */}
                    <h3 style={{color:"blue"}}>Name :  {user.firstnameRef}</h3>
                    <h3 style={{color:"blue"}}> Lastname: {user.lastnameRef} </h3>
                    <h3 style={{color:"blue"}}>Student Number: {user.studentNumRef}</h3>   
                {/* </Container> */}
                </div>
                <div>
                    <p>    ===========================================================================================================================</p>
                </div>
                </>
            ))}

        </div>
    )
}

export default UsersT ;


