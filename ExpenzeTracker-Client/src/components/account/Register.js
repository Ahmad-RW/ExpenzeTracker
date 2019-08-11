import React, { Component } from 'react'
import axios from 'axios'
import {withRouter } from 'react-router-dom'
import urls from '../../router/urls'
class Register extends Component {
    state = {
        registerFailed : ""
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
            passwrod : this.state.password,
            username : this.state.username
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
    render() {
        return (
            <React.Fragment>
            {this.renderDuplicationMessage()}
           <input onChange={this.handleChange} placeholder="email" id="email" />
           <br/>
           <input onChange={this.handleChange} placeholder="username" id="username" />
           <br/>

           <input onChange={this.handleChange} placeholder="password" id="password"/>
           <button onClick={this.postRegister}>Go!</button>
           </React.Fragment>
        )
    }
}

export default withRouter(Register)