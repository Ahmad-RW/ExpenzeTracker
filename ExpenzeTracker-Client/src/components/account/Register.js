import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import urls from '../../router/urls'
import '../../style/userform.css'
import { Input, Button, Icon, Label } from 'semantic-ui-react'
import bcryptjs from 'bcryptjs'
class Register extends Component {
    state = {
        registerFailed : "",
        confirmPassword : "",
        raiseValidationError : false,
        login: false 
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    postRegister= () =>{
        const payload = {
            email : this.state.email,
            password : bcryptjs.hashSync(this.state.password, 10),
            username : this.state.username,
            
        }
        axios.post('http://localhost:5000/account/register', {payload}).then(res=>{
            if(res.status === 201){
                this.props.history.push(urls.landingPage, {registerSuccess : true})
            }
        }).catch(err=>{

            this.setState({
                registerFailed : true
            })
        
        })
    }


    renderDuplicationMessage = () =>{
        if(this.state.registerFailed){
            return <h1>email is being used</h1>
        }
    }

    checkEquality = (e) =>{
        this.setState({
            confirmPassword : e.target.value,
            raiseValidationError : this.state.password !== e.target.value
        })
    }

    raiseValidationError = () =>{
        if(this.state.raiseValidationError){
            return<h2>passwords are not the same</h2>
        }
    }


    render() {
        return (
            <React.Fragment>
            <div class="user-form">
                <h1>Sign Up</h1>
                {this.renderDuplicationMessage()}
                {this.raiseValidationError()}
                <div>
                    <label>Email</label>
                    <Input onChange={this.handleChange} placeholder="email" id="email" />
                </div>
                <div>
                    <label>Username</label>
                    <Input onChange={this.handleChange} placeholder="username" id="username" />
                </div>
                <div>
                    <label>Password</label>
                    <Input onChange={this.handleChange} type="password" placeholder="password" id="password"/>
                </div>
                <div>
                    <label>Confirm</label>
                    <Input onChange={this.checkEquality} type="password" placeholder="confirmPassword" id ="confirmPassword"/>
                </div>
                {this.state.raiseValidationError ? (<Button onClick={this.postRegister} disabled>Sign Up</Button>) : (<Button onClick={this.postRegister}>Sign Up</Button>)}
                <span>Already have an account? <Link to={{ pathname: urls.login  }}><span>sign in</span></Link></span>
            </div>
           </React.Fragment>
        )
    }
}

export default withRouter(Register)