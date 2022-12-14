import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import ResetPassword from "./components/resestPass";
import PostDetails from "./components/postDetails";
import { useUserContext } from "./context/userContext";
import "./index.css";


import PostsT from "./components/PostsT";
import AllPostsT  from "./components/AllPostsT";
import {BrowserRouter , Routes, Route} from "react-router-dom" ;
import UsersT from "./components/UsersT";
import MyPostsT from "./components/MyPostsT";
import AnswerT from "./components/AnswerT";
import ATP from "./components/ATP";
import MyDashboard from "./components/MyDashboard";
import Categories from "./components/categories";
import Admin from "./components/admin";
import AdminDelete from "./components/adminDelete";


// import Signin from "./components/signin";
// import Signup from "./components/signup";


function App() {
  const { user, loading, error } = useUserContext();

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Auth />} </>}
       
     
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/> */}
        <Route path="/createposts" element={<PostsT/>}/>
        <Route path="/posts" element={<AllPostsT/>}/>
        {/* if you render the path of the dashboard it appears twice*/}
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/reset" element={<ResetPassword/>}/>
        <Route path="/allusers" element={<UsersT/>}/> 
        <Route path="/myposts" element={<MyPostsT/>}/>
        <Route path="/details" element={<PostDetails/>}/>
        <Route path="/answer" element={<AnswerT/>}/> 
        <Route path="/allanswers" element={<ATP/>}/> 
        <Route path="/mydashboard" element={<MyDashboard/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/adminDelete" element={<AdminDelete/>}/>
      </Routes>
      </BrowserRouter>
 
       
      
    </div>
    
  );
}

export default App;
