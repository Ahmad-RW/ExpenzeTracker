import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import '../../style/userform.css'
import { Input, Button, Icon, Label } from 'semantic-ui-react'


class Login extends Component{

    constructor(props){
        super(props)
    }
    state = {
        email : "",
        password : "",
        authError : false,
        confirmationError : false
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    postLogin = () =>{
        let payload = {
            email : this.state.email,
            password : this.state.password
        }

      
        axios.post('/account/login', {payload}).then(res=>{
            if(res.status === 200){
                const payload = {
                    userData : res.data
                }
                this.props.setAuth(payload)
                this.props.history.push('/home')
                return
            }
        }).catch(err=>{
            if(err.response.status === 403){
                this.setState({confirmationError : true})
            }
            if(err.response.status === 401){
            this.setState({authError : true})
            }
        })
    }

    raiseError = () =>{
        if(this.state.confirmationError){
            return <h1>you have to confirm your email buddy. my names jim buddy</h1>
        }
        if(this.state.authError){
            return <h1>password and/or email is wrooong</h1>
        }
        
    }

   
    render(){
        return(
            <React.Fragment>
                <div class="login">
                    <div class="user-form">
                        <h1>Log in</h1>
                        {this.raiseError()}
                        <div>
                            <label>Email</label>
                            <Input onChange={this.handleChange} type="text" id ="email" placeholder="Email" />
                        </div>
                        <div>
                            <label>Password</label>
                            <Input onChange={this.handleChange} type="password" id ="password" placeholder="Password"  />
                        </div>
                        <Button onClick={this.postLogin}>log in</Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuth : (payload) =>{dispatch({type:"AUTH_USER", payload})}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)