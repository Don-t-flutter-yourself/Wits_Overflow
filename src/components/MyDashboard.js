import React from "react";
import Navbar from "./navbar";
import "../components/navbar.css";
import firebase from "../firebase/index";
import { useEffect, useState } from 'react';
import Categories from "../components/categories";

const Dashboard = () => {
    //     const [category, setCategoty] = useState([]);

    // const ref = firebase.firestore().collection("UserPosts")

    // function getCategory() {
    //     ref.where('u_category', '==', category).onSnapshot((querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //         });
    //         setCategoty(items);
    //     })
    // }

    // useEffect(() => {
    //     getCategory();
    // });

//     const [myAnswers, setMyAnswers] = useState([]);

//     const ref = firebase.firestore().collection("UAnswers")
// // function for getting answers related to your question
//     function getMyAnswers() {
//         ref.onSnapshot((querySnapshot) => {
//             const items = [];
//             querySnapshot.forEach((doc) => {
//                 items.push(doc.data());
//             });
//             setMyAnswers(items);
//         })
//     }

//     useEffect(() => {
//         getMyAnswers();
//     });

    return (
        <div className='mypostPage'>
    <Categories/>

            {/* <h1 className='myposttitle'>All Answers to All Questions</h1>
            {category.map((mycategory) =>
                <div key={mycategory.u_id}>
                </div>
            )} */}


            {/* {myAnswers.map((myanswer) => (
                <div key={myanswer.doc_id}>
                    <br />
                    <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>Question : </h3>
                    <p> {myanswer.u_question}</p>
                    <br />
                    <h4 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>Answer : </h4>
                    <p> {myanswer.u_answer}</p>
                    <br />
                    <hr />
                </div>
            ))} */}
            {/* <Container className='categoryBox'>
                <p>Nmae</p>
            </Container> */}
        </div>
    );
};

export default Dashboard;
