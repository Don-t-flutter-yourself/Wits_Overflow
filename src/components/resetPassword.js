import React, { Component } from "react";
import { connect } from 'react-redux';
import { forgotPassword } from "../authentication/authActions";

class resetPassword extends Component{
    state = {
        //stuNum: '',
        email: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        this.props.forgotPassword(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render(){
        //const { authError } = this.props;
        return(
            <div className="passReset">
                <h2>Password Reset</h2>
                <form onSubmit={this.handleSubmit}>          
                {/* <label htmlFor="stuNum">studdent number:</label> */}
                    <label htmlFor="email">email:</label>
                    <input type="email" id="email" required onChange={this.handleChange}></input>
                    <button>enter</button> 
            </form>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{ 
        forgotPassword: (creds) => dispatch(forgotPassword(creds))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(resetPassword);
