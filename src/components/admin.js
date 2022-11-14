import React, { useState, useEffect, useRef } from 'react'
import firebase from '../firebase/index'
import { useNavigate } from "react-router-dom";
import '../styles/AllPosts.css';
import Select from 'react-select';

function Admin() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearch] = useState('');
    // const [searchCategory, setSearchCat] = useState('');
    // const [sortByValue, setSortBy] = useState('');
    const [code, setCode] = useState('');

    const ref = firebase.firestore().collection("UserPosts");

    const nav = useNavigate();

    function AllPosts() {
        ref.where("u_Downvote",">",0).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setPosts(items);
        });
    }
//details of the post gotten by data fetching
    useEffect(() => { AllPosts() }, []);

    function onPost(mystate) {
        nav('/adminDelete', {
            state: {
                my_question: mystate.u_question,
                my_caption: mystate.u_caption,
                my_email: mystate.u_email,
                my_username: mystate.u_username,
                my_uid: mystate.u_id,
                my_time: mystate.u_created,
                my_u_doc_id: mystate.u_doc_id, 
                my_UpVote: mystate.u_Upvote,
                my_DownVote: mystate.u_Downvote,
                my_category: mystate.u_category,
                my_image: mystate.u_image
            }
        })

    }

    const categories = [
        { label: "Software Design", value: 1 },
        { label: "Advanced Analysis of Algorithms", value: 2 },
        { label: "Parallel Computing", value: 3 },
        { label: "Operating Systems", value: 4 },
        { label: "Computer Graphics and Visualization", value: 5 },
        { label: "Machine Learning", value: 6 },
        { label: "Formal Languages and Automata", value: 7 }
    ];

    document.body.style.overflow = 'hidden';

    const [category, setCategory] = useState("SearchByCategory");
    const codeRef = useRef();

    const onAccess = (e) => {
     //   e.preventDefault();
        let cd = codeRef.current.value;
        if (cd == "fx-82ES^p!us^SE28-xf"){
            setCode(cd);
            //codeRef = '';
        }
    };

    return (
        <div>
             {code=='' && <section className="details">
                <div className='sideBlock'>
                   <button className='backbtn' onClick={() => nav(-1)}>Back</button>
                </div> 
                <div className='codePage'>
                    <h2 className='codelabel'>ADMIN CODE</h2>

                    <div className="code">
                        <form onSubmit={onAccess}>
                            <input className="codeinput" placeholder="enter admin code" type="text" required ref={codeRef}/>
                            <button className='codebtn' type='submit'>Verify</button>
                        </form>
                    </div>
                </div>
            </section>} 
            {code!='' && <section className="details">
                <div className='sideBlock'>
                   <button className='posbtn' onClick={() => nav(-1)}>Back</button>
                </div>
                <div className='postsPage'>
                    <h2 className='postsTitle'>POSTS</h2>

                    <div className="search">
                        <input className="searchinput" placeholder="search post" type="text" onChange={(e) => setSearch(e.target.value)} value={searchQuery}/>
                    </div>

                    <div className='sort-cat'>
                        <div className="searchCat">
                            <Select placeholder={category} options={categories} isSearchable
                                onChange={(event) => 
                                //setCategory(Array.isArray(event)?event.map(x=>x.label):[])
                                setCategory(event.label)
                                //handleChange(event)
                                }
                            />
                        </div>

                        {/* <div className="searchSort">
                            <Select placeholder={sortBy} options={sorts}
                                onChange={(event) => 
                                //setCategory(Array.isArray(event)?event.map(x=>x.label):[])
                                setSort(event.label)
                                //handleChange(event)
                                }
                            />
                        </div> */}
                    </div>

                    {category==="SearchByCategory" && posts.filter((post) => {
                        if (searchQuery === ''){
                            return post
                        }
                        
                        if (post.u_question.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())){
                            return post
                        }
                    })
                    .map((post) => (
                        <div className='questionContainer' key={post.u_id}>
                        <h1 style={{fontFamily: 'sans-serif', textTransform:'uppercase',color:'rgba(125,125,125,1)'}}>{post.u_caption}</h1>
                        <h4 style={{ marginTop:'10px', fontSize:'22px', color:'rgb(0, 33, 65)'}}>Question </h4>
                        <p style={{color:'gray'}}>📖 {post.u_category}</p>
                        <p> {post.u_question}</p>
                        <button className='allpostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote ,u_doc_id : post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                            View in detail
                        </button>
                        <p>{post.my_time}</p>
                        <hr className='linedivider'/>
                        </div>
                    ))}

                    {category!=="SearchByCategory" && posts.filter((post) => {
                        if (post.u_category === category){
                            return post
                        }
                    })
                    .map((post) => (
                        <div className='questionContainer' key={post.u_id}>
                        <h1 style={{fontFamily: 'sans-serif', textTransform:'uppercase',color:'rgba(125,125,125,1)'}}>{post.u_caption}</h1>
                        <h4 style={{ marginTop:'10px', fontSize:'22px', color:'rgb(0, 33, 65)'}}>Question </h4>
                        <p style={{color:'gray'}}>📖 {post.u_category}</p>
                        <p> {post.u_question}</p>
                        <button className='allpostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote ,u_doc_id : post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                            View in detail
                        </button>
                        <p>{post.my_time}</p>
                        <hr className='linedivider'/>
                        </div>
                    ))}
                </div>
            </section>}
        </div>
    )
}

export default Admin;

