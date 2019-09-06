import React from 'react'
import axios from 'axios'
import { getFeedbackMessage } from './helpers';
import { connect } from 'react-redux';
import { Input, Button, Form } from 'semantic-ui-react'

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
        axios.post("/account/changePassword", {payload}).then(res=>{
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
                <Form>
                <Form.Group widths='equal'>
                    <Form.Input onChange={this.handleChange} type="text" placeholder="password" id="password"/>
                    <Form.Input onChange={this.handleChange} type="text" placeholder="new password" id="newPassword" />
                    <Form.Input onChange={this.handleChange} type="text" placeholder="re enter new password" id="reNewPassword" />
                    <Button onClick={this.postNewPassword}>save</Button>
                </Form.Group>
                </Form>
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