import React, { Component } from 'react'
import axios from 'axios'
import {withRouter } from 'react-router-dom'
import urls from '../../router/urls'
import bcryptjs from 'bcryptjs'
class Register extends Component {
    state = {
        registerFailed : "",
        confirmPassword : "",
        raiseValidationError : false
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
        console.log(this.state)
    }
    postRegister= () =>{
        const payload = {
            email : this.state.email,
            password : bcryptjs.hashSync(this.state.password, 10),
            username : this.state.username,
            
        }
        axios.post('http://localhost:5000/account/register', {payload}).then(res=>{
            console.log(res)
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
        console.log(this.state)
    }

    raiseValidationError = () =>{
        if(this.state.raiseValidationError){
            return<h2>passwords are not the same</h2>
        }
    }


    render() {
        return (
            <React.Fragment>
            {this.renderDuplicationMessage()}
            {this.raiseValidationError()}
           <input onChange={this.handleChange} placeholder="email" id="email" />
           <br/>
           <input onChange={this.handleChange} placeholder="username" id="username" />
           <br/>

           <input onChange={this.handleChange} placeholder="password" id="password"/>
           <input onChange={this.checkEquality} placeholder="confirmPassword" id ="confirmPassword"/>
           {this.state.raiseValidationError ? (<button onClick={this.postRegister} disabled>Go!</button>) : (<button onClick={this.postRegister}>Go!</button>)}
           </React.Fragment>
        )
    }
}

export default withRouter(Register)