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

  const [SDViewP, setSDViewP] = useState(false)
  const [MLViewP, setMLViewP] = useState(false)
  const [OSViewP, setOSViewP] = useState(false)
  const [CGVViewP, setCGVViewP] = useState(false)
  const [PCViewP, setPCViewP] = useState(false)
  const [AAAViewP, setAAAViewP] = useState(false)
  const [FLAViewP, setFLAViewP] = useState(false)

  const [FLAP, setFLAP] = useState([])
  const [MLP, setMLP] = useState([])
  const [CGVP, setCGVP] = useState([])
  const [OSP, setOSP] = useState([])
  const [PCP, setPCP] = useState([])
  const [AAAP, setAAAP] = useState([])
  const [SDP, setSDP] = useState([])

  const [SDViewT, setSDViewT] = useState(false)
  const [MLViewT, setMLViewT] = useState(false)
  const [OSViewT, setOSViewT] = useState(false)
  const [CGVViewT, setCGVViewT] = useState(false)
  const [PCViewT, setPCViewT] = useState(false)
  const [AAAViewT, setAAAViewT] = useState(false)
  const [FLAViewT, setFLAViewT] = useState(false)

  const [FLAT, setFLAT] = useState([])
  const [MLT, setMLT] = useState([])
  const [CGVT, setCGVT] = useState([])
  const [OST, setOST] = useState([])
  const [PCT, setPCT] = useState([])
  const [AAAT, setAAAT] = useState([])
  const [SDT, setSDT] = useState([])


  const ref = firebase.firestore().collection("UserPosts");
  function AllPosts() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      // console.log('length: ', items.length)
      setCategories(items)
      setCategoriesP(items)  ;
      setCategoriesT(items) ;
    });
  }

  const setCategories = (postsList) => {
    var SDArr = []
    var AAAArr = []
    var PCArr = []
    var OSArr = []
    var CGVArr = []
    var MLArr = []
    var FLAArr = []

    for (var i = 0; i < postsList.length; ++i) {
      if (postsList[i].u_category === "Software Design") SDArr.push(postsList[i])
      else if (postsList[i].u_category === "Advanced Analysis of Algorithms") AAAArr.push(postsList[i])
      else if (postsList[i].u_category === "Parallel Computing") PCArr.push(postsList[i])
      else if (postsList[i].u_category === "Operating Systems") OSArr.push(postsList[i])
      else if (postsList[i].u_category === "Computer Graphics and Visualization") CGVArr.push(postsList[i])
      else if (postsList[i].u_category === "Machine Learning") MLArr.push(postsList[i])
      else if (postsList[i].u_category === "Formal Languages and Automata") FLAArr.push(postsList[i])
    }
    setSD(SDArr)
    setAAA(AAAArr)
    setPC(PCArr)
    setOS(OSArr)
    setCGV(CGVArr)
    setML(MLArr)
    setFLA(FLAArr)
  }

  const setCategoriesP = (postsList) => {
    var SDArrP = []
    var AAAArrP = []
    var PCArrP = []
    var OSArrP = []
    var CGVArrP = []
    var MLArrP = []
    var FLAArrP = []

    for (var i = 0; i < postsList.length; ++i) {
      if (postsList[i].u_category === "Software Design" && postsList[i].u_Upvote >=2)
      {
        SDArrP.push(postsList[i])
  
      } 
      else if (postsList[i].u_category === "Advanced Analysis of Algorithms" && postsList[i].u_Upvote >=2) 
      {
        AAAArrP.push(postsList[i])
      }
     
      else if (postsList[i].u_category === "Parallel Computing" && postsList[i].u_Upvote >=2) 
      {
        PCArrP.push(postsList[i])
      }
     
      else if (postsList[i].u_category === "Operating Systems" && postsList[i].u_Upvote >=2) 
      {
        OSArrP.push(postsList[i])
      }
      else if (postsList[i].u_category === "Computer Graphics and Visualization" && postsList[i].u_Upvote >=2) 
      {
        CGVArrP.push(postsList[i])
      }
      else if (postsList[i].u_category === "Machine Learning" && postsList[i].u_Upvote >=2)
      {
        MLArrP.push(postsList[i])
      } 
      else if (postsList[i].u_category === "Formal Languages and Automata" && postsList[i].u_Upvote >=2) 
      {
        FLAArrP.push(postsList[i])
      }
      
    }
    setSDP(SDArrP)
    setAAAP(AAAArrP)
    setPCP(PCArrP)
    setOSP(OSArrP)
    setCGVP(CGVArrP)
    setMLP(MLArrP)
    setFLAP(FLAArrP)
  }

  const setCategoriesT = (postsList) => {
    var SDArrT = []
    var AAAArrT = []
    var PCArrT = []
    var OSArrT = []
    var CGVArrT = []
    var MLArrT = []
    var FLAArrT = []

    const d2 = new Date() ;
   
    for (var i = 0; i < postsList.length; ++i) {
      if (postsList[i].u_category === "Software Design" && new Date(postsList[i].u_created.seconds*1000).toLocaleDateString() === d2.toLocaleDateString() )
      {
        SDArrT.push(postsList[i])
       
      } 
      else if (postsList[i].u_category === "Advanced Analysis of Algorithms" && new Date(postsList[i].u_created.seconds*1000).toLocaleDateString() === d2.toLocaleDateString())
      {
        AAAArrT.push(postsList[i])
      }
      else if (postsList[i].u_category === "Parallel Computing" && new Date(postsList[i].u_created.seconds*1000).toLocaleDateString() === d2.toLocaleDateString()) 
      {
        PCArrT.push(postsList[i])
      }
     
      else if (postsList[i].u_category === "Operating Systems" && new Date(postsList[i].u_created.seconds*1000).toLocaleDateString() === d2.toLocaleDateString()) 
      {
        OSArrT.push(postsList[i])
      }
      else if (postsList[i].u_category === "Computer Graphics and Visualization" && new Date(postsList[i].u_created.seconds*1000).toLocaleDateString() === d2.toLocaleDateString()) 
      {
        CGVArrT.push(postsList[i])
      }
      else if (postsList[i].u_category === "Machine Learning" && new Date(postsList[i].u_created.seconds*1000).toLocaleDateString() === d2.toLocaleDateString() )
      {
        MLArrT.push(postsList[i])
      } 
      else if (postsList[i].u_category === "Formal Languages and Automata" && new Date(postsList[i].u_created.seconds*1000).toLocaleDateString() === d2.toLocaleDateString() ) 
      {
        FLAArrT.push(postsList[i])
      }
      
    }
    setSDT(SDArrT)
    setAAAT(AAAArrT)
    setPCT(PCArrT)
    setOST(OSArrT)
    setCGVT(CGVArrT)
    setMLT(MLArrT)
    setFLAT(FLAArrT)
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

  const Popular = (cat) => {
    if (cat === "Software Design"){ 
      setSDViewP(!SDViewP)
    }
    else if (cat === "Advanced Analysis of Algorithms"){
      setAAAViewP(!AAAViewP)
    } 
    else if (cat === "Parallel Computing"){
      setPCViewP(!PCViewP)
    } 
    else if (cat === "Operating Systems"){
      setOSViewP(!OSViewP)
    } 
    else if (cat === "Computer Graphics and Visualization"){
      setCGVViewP(!CGVViewP)
    }
    else if (cat === "Machine Learning"){
      setMLViewP(!MLViewP)
    } 
    else if (cat === "Formal Languages and Automata"){
      setFLAViewP(!FLAViewP)
    } 
  }

  const Today = (cat) => {
    if (cat === "Software Design"){
      setSDViewT(!SDViewT)
    } 
    else if (cat === "Advanced Analysis of Algorithms"){
      setAAAViewT(!AAAViewT)
    } 
    else if (cat === "Parallel Computing"){
      setPCViewT(!PCViewT)
    } 
    else if (cat === "Operating Systems"){
      setOSViewT(!OSViewT)
    } 
    else if (cat === "Computer Graphics and Visualization"){
      setCGVViewT(!CGVViewT)
    } 
    else if (cat === "Machine Learning"){
      setMLViewT(!MLViewP)
    } 
    else if (cat === "Formal Languages and Automata"){
      setFLAViewT(!FLAViewT)
    } 
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
            <p style={{ color: "rgba(125,135,125,1)" }}>{cat.Description} </p>
            <hr className="linedivider" />
            <button className='expandbtn' onClick={() => Expanded(cat.Category)}>Expand</button>
            <button className='popularbtn' onClick={() => Popular(cat.Category)}>Popular</button>
            <button className='todaybtn' onClick={() => Today(cat.Category)} >Today</button>
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

            <div style={{ marginLeft: '50px' }}>
              {OSViewP && cat.Category === "Operating Systems" && OSP.length > 0 && OSP.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {SDViewP && cat.Category === "Software Design" && SDP.length > 0 && SDP.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {AAAViewP && cat.Category === "Advanced Analysis of Algorithms" && AAAP.length > 0 && AAAP.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {PCViewP && cat.Category === "Parallel Computing" && PCP.length > 0 && PCP.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {CGVViewP && cat.Category === "Computer Graphics and Visualization" && CGVP.length > 0 && CGVP.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {MLViewP && cat.Category === "Machine Learning" && MLP.length > 0 && MLP.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {FLAViewP && cat.Category === "Formal Languages and Automata" && FLAP.length > 0 && FLAP.map((post) => (
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

            <div style={{ marginLeft: '50px' }}>
              {OSViewT && cat.Category === "Operating Systems" && OST.length > 0 && OST.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {SDViewT && cat.Category === "Software Design" && SDT.length > 0 && SDT.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {AAAViewT && cat.Category === "Advanced Analysis of Algorithms" && AAAT.length > 0 && AAAT.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {PCViewT && cat.Category === "Parallel Computing" && PCT.length > 0 && PCT.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {CGVViewT && cat.Category === "Computer Graphics and Visualization" && CGVT.length > 0 && CGVT.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {MLViewT && cat.Category === "Machine Learning" && MLT.length > 0 && MLT.map((post) => (
                <div className='catQuestionContainer' key={post.u_id}>
                  <h3 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: 'rgb(0, 33, 65)' }}>{post.u_caption}</h3>
                  <h4 > Question: </h4>
                  <p style={{ color: 'white' }}> {post.u_question} </p>
                  <button className='catPostsbtn' type="details" variant="contained" color="primary" onClick={() => onPost({ u_image: post.u_image, u_Upvote: post.u_Upvote, u_Downvote: post.u_Downvote, u_doc_id: post.u_doc_id, u_id: post.u_id, u_question: post.u_question, u_caption: post.u_caption, u_email: post.u_email, u_username: post.u_username, u_created: post.u_created })}>
                    View in detail
                  </button>
                </div>
              ))}
              {FLAViewT && cat.Category === "Formal Languages and Automata" && FLA.lengthT > 0 && FLAT.map((post) => (
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