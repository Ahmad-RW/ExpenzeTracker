import React from 'react'
import axios from 'axios'
import { getFeedbackMessage } from './helpers';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react'

class ChangePassword extends React.Component{
    state = {
        password: "",
        newPassword:"",
        reNewPassword : "",
        raiseInequalityError : false
    }
    handleChange = e=>{
        console.log(e.target.id)
        this.setState({
            [e.target.id] : e.target.value 
        })
    }
    postNewPassword = () =>{
        if(this.state.reNewPassword !== this.state.newPassword){
            getFeedbackMessage(this, "passwords dont match", "passwords dont match", "error")
            return
        }
        const payload = {
            newPassword : this.state.newPassword,
            reNewPassword : this.state.reNewPassword,
            password : this.state.password,
            userData: this.props.userData
        }
        axios.post("http://localhost:5000/account/changePassword", {payload}).then(res=>{
            console.log(res)
            getFeedbackMessage(this, "password changed", "password changed successfully", "success")
        }).catch(err=>{
            if(err.response.status === 401){
            getFeedbackMessage(this, "error", "password incorrect", "error")

            }
        })
    }
   
    render(){
        return (
            <React.Fragment>
                {this.state.feedbackMessage}
                <Input onChange={this.handleChange} type="text" placeholder="password" id="password"/> <br />
                <Input onChange={this.handleChange} type="text" placeholder="new password" id="newPassword" /><br />
                <Input onChange={this.handleChange} type="text" placeholder="re enter new password" id="reNewPassword" /><br />
                <Button onClick={this.postNewPassword}>change password</Button>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
      userData: state.userData
    };
  };


export default connect(mapStateToProps, null)(ChangePassword)