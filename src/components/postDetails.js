import React from "react";

import { useLocation } from "react-router-dom";

const PostDetails = (props) => {

    const loc = useLocation() ;
    return ( 
        <div className="details">
              <h2>Post Creator :  {loc.state.my_username} </h2>
            <h2>Email : {loc.state.my_email} </h2>
            <h4>Date The Post Was Created : {new Date(loc.state.my_time.seconds* 1000).toLocaleDateString()}</h4>
            <h4>Time The Post Was Created : {new Date(loc.state.my_time.seconds*1000).toLocaleTimeString()}</h4>
            <h3>Caption  : {loc.state.my_caption}  </h3>
            <p>Question Asked : {loc.state.my_question} </p>
        </div>
    );
}
 
export default PostDetails;