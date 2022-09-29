import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import ResetPassword from "./components/resestPass";
import PostDetails from "./components/postDetails";
import { useUserContext } from "./context/userContext";
import "./index.css";


import PostsT from "./components/PostsT";
import AllPostsT  from "./components/AllPostsT";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" ;
import UsersT from "./components/UsersT";
import MyPostsT from "./components/MyPostsT";
import AnswerT from "./components/AnswerT";
import ATP from "./components/ATP";


// import Signin from "./components/signin";
// import Signup from "./components/signup";


function App() {
  const { user, loading, error } = useUserContext();

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Auth />} </>}
       
     
      <Router>
      <Routes>
        {/* <Route path="/" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/> */}
        <Route path="/createposts" element={<PostsT/>}/>
        <Route path="/posts" element={<AllPostsT/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/reset" element={<ResetPassword/>}/>
        <Route path="/allusers" element={<UsersT/>}/> 
        <Route path="/myposts" element={<MyPostsT/>}/>
        <Route path="/details" element={<PostDetails/>}/>
        <Route path="/answer" element={<AnswerT/>}/> 
        <Route path="/allanswers" element={<ATP/>}/> 
      </Routes>
      </Router>
 
       
      
    </div>
    
  );
}

export default App;
