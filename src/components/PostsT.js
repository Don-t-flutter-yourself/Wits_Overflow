
/////Thabelo :

import React, {Component} from 'react' ;
import { v4  as uuidv4 } from 'uuid' ;
import firebase from '../firebase/index' ;



class PostsT extends Component{
    constructor(props){
        super(props)
        this.state = {
            u_caption: '',
            u_question: '',
            u_id: '',
          
        }


        this.handlerChangeCaption = this.handlerChangeCaption.bind(this) ;
        this.handlerChangeQuestion = this.handlerChangeQuestion.bind(this) ;
      

    }

    

    handlerChangeCaption(event){
        this.setState({
            u_caption: event.target.value
        })
    }

    handlerChangeQuestion(event){
        this.setState({
            u_question: event.target.value
        })
    }

    //State of Student number will be retrieved from from Users Table?????

    
  


    render(){
        

        const ref = firebase.firestore().collection('UserPosts');
        const{u_caption, u_question } = this.state

        function handleAddPost(datapoint){   //Where post is the entire object/datapoint
            ref.doc(datapoint.id)
            ref.add(datapoint)
            alert("Question Posted.")
        }


        return(
                <div>
                   <div>
                     <h5><label>Caption : </label> </h5>
                     <input type="text" value={u_caption} onChange={this.handlerChangeCaption}></input>
                   </div>

                   <div>
                     <h5><label>Question : </label></h5>
                    <textarea value={u_question} onChange={this.handlerChangeQuestion}></textarea>
                   </div>

                   <div>
                     <button type="post" variant="contained" color="primary" onClick={() => handleAddPost({u_caption, u_question, u_id: uuidv4()})}>Post </button>
                   </div>
                     
                    
                
                        
            
                   
                </div>
      
        )
    }
}

export default PostsT ;


/////////Thabelo :