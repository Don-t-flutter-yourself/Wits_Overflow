import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import ResetPassword from "./components/resestPass";
import PostDetails from "./components/postDetails";
import { useUserContext } from "./context/userContext";
import "./index.css";

///////Thabelo: These are the imports necessary for changing pages using urls/routing. Also going to be used to link to the Navigation Bar.
import PostsT from "./components/PostsT";
import AllPostsT  from "./components/AllPostsT";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" ;
import UsersT from "./components/UsersT";
import MyPostsT from "./components/MyPostsT";
import AnswerT from "./components/AnswerT";


// import Signin from "./components/signin";
// import Signup from "./components/signup";
///////Thabelo:

function App() {
  const { user, loading, error } = useUserContext();

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Auth />} </>}
       
       {/* Thabelo: This is the routing process */}
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
      </Routes>
      </Router>
    {/* Thabelo */}
       
      
    </div>
    
  );
}

export default App;
