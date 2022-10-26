import React, { useState, useEffect } from 'react'
import '../styles/category.css';
import firebase from '../firebase/index'
import { useNavigate } from "react-router-dom";


const Categories = () => {

  const categories = [
    { Category: "Software Design", Description: "Questions related to Software Design, Design Patterns, Architectures Styles, UML Diagrams, Testing, etc." },
    { Category: "Advanced Analysis of Algorithms", Description: "Questions related to Algorithms, Dynamic Programming, Sort/Search/Greedy Algorithms, Complexities(Big O notation, proofs), Artificial Intelligence, Computational Geometry, etc." },
    { Category: "Parallel Computing", Description: "Questions related to Parallel Systems, APIs(OpenMP, MPI), parallelised algorithms, etc." },
    { Category: "Operating Systems", Description: "Questions related to Operating Systems, Types(Linux, iOS, Android, etc.), their Purpose/Fuctionality, Processing, Threads, Packaging, Scheduling, etc." },
    { Category: "Computer Graphics and Visualization", Description: "Questions related to Computer Graphics, Pixels, Rasterization, Rendering Scenes, Animation,Visulization(Lighting, Material, etc.), Computational Geometry, APIs(OpenGL, WebGL, etc.), Modelling(Scene Objects ~ Hierarchical/Sub-routine/Scene Graphs etc.), etc." },
    { Category: "Machine Learning", Description: "Questions related to machine learning, Neural Networks, Creation/Training Models, Collecting/Manipulation of Data, Classification vs Regression, Methods(e.g., Naive Bayes, Decision Trees, etc.), Reinforcement Learning(AI)" },
    { Category: "Formal Languages and Automata", Description: "Questions related to Fundamental Theory of Computer Science and Computation, Turing Machines, Finite/Push-Down Automata, diffrent types of languages(e.g., regular, context-free, etc.), proofs, etc." }
  ]

  const [FLA, setFLA] = useState([])
  const [ML, setML] = useState([])
  const [CGV, setCGV] = useState([])
  const [OS, setOS] = useState([])
  const [PC, setPC] = useState([])
  const [AAA, setAAA] = useState([])
  const [SD, setSD] = useState([])

  const [SDView, setSDView] = useState(false)
  const [MLView, setMLView] = useState(false)
  const [OSView, setOSView] = useState(false)
  const [CGVView, setCGVView] = useState(false)
  const [PCView, setPCView] = useState(false)
  const [AAAView, setAAAView] = useState(false)
  const [FLAView, setFLAView] = useState(false)

  const ref = firebase.firestore().collection("UserPosts");
  function AllPosts() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      // console.log(items)
      setCategories(items)
    });
  }

  const setCategories = (postsList) => {
    for (var i = 0; i < postsList.length; ++i) {
      if (postsList[i].u_category === "Software Design") setSD([...SD, postsList[i]])
      else if (postsList[i].u_category === "Advanced Analysis of Algorithms") setAAA([...AAA, postsList[i]])
      else if (postsList[i].u_category === "Parallel Computing") setPC([...PC, postsList[i]])
      else if (postsList[i].u_category === "Operating Systems") setOS([...OS, postsList[i]])
      else if (postsList[i].u_category === "Computer Graphics and Visualization") setCGV([...CGV, postsList[i]])
      else if (postsList[i].u_category === "Machine Learning") setML([...ML, postsList[i]])
      else if (postsList[i].u_category === "Formal Languages and Automata") setFLA([...FLA, postsList[i]])
    }
  }

  useEffect(() => { AllPosts() }, []);
  const Expanded = (cat) => {
    if (cat === "Software Design") setSDView(!SDView)
    else if (cat === "Advanced Analysis of Algorithms") setAAAView(!AAAView)
    else if (cat === "Parallel Computing") setPCView(!PCView)
    else if (cat === "Operating Systems") setOSView(!OSView)
    else if (cat === "Computer Graphics and Visualization") setCGVView(!CGVView)
    else if (cat === "Machine Learning") setMLView(!MLView)
    else if (cat === "Formal Languages and Automata") setFLAView(!FLAView)
  }

  const nav = useNavigate();

  function onPost(mystate) {
    nav('/details', {
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

  return (
    <div className="categories">
      <h2 className='category'>Category</h2>
      <div className='col'>
        {categories.map((cat) => (
          <div className='categoryBox'>
            <h2 style={{ color: 'rgb(0, 33, 65)', marginTop: '20px', textTransform: 'uppercase' }}>{cat.Category}:</h2>
            <p style={{color:"rgba(125,135,125,1)"}}>{cat.Description} </p>
            <hr className="linedivider" />
            <button className='expandbtn' onClick={() => Expanded(cat.Category)}>Expand</button>
            <div style={{ marginLeft: '50px' }}>
              {OSView && cat.Category === "Operating Systems" && OS.length > 0 && OS.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                <h4 > Question: </h4>
                <p style={{ color: 'white' }}> {post.u_question} </p>
                <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                  View in detail
                </button>
              </div>
              ))}
              {SDView && cat.Category === "Software Design" && SD.length > 0 && SD.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {AAAView && cat.Category === "Advanced Analysis of Algorithms" && AAA.length > 0 && AAA.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                <h4 > Question: </h4>
                <p style={{ color: 'white' }}> {post.u_question} </p>
                <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                  View in detail
                </button>
              </div>
              ))}
              {PCView && cat.Category === "Parallel Computing" && PC.length > 0 && PC.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                <h4 > Question: </h4>
                <p style={{ color: 'white' }}> {post.u_question} </p>
                <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                  View in detail
                </button>
              </div>
              ))}
              {CGVView && cat.Category === "Computer Graphics and Visualization" && CGV.length > 0 && CGV.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                <h4 > Question: </h4>
                <p style={{ color: 'white' }}> {post.u_question} </p>
                <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                  View in detail
                </button>
              </div>
              ))}
              {MLView && cat.Category === "Machine Learning" && ML.length > 0 && ML.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                <h4 > Question: </h4>
                <p style={{ color: 'white' }}> {post.u_question} </p>
                <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                  View in detail
                </button>
              </div>
              ))}
              {FLAView && cat.Category === "Formal Languages and Automata" && FLA.length > 0 && FLA.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                <h4 > Question: </h4>
                <p style={{ color: 'white' }}> {post.u_question} </p>
                <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                  View in detail
                </button>
              </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories;