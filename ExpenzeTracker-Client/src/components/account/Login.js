import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


class Login extends Component{

    constructor(props){
        super(props)
        console.log(props)
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

      
        console.log(payload)
        axios.post('http://localhost:5000/account/login', {payload}).then(res=>{
            if(res.status === 200){
                console.log(res)
                const payload = {
                    userData : res.data
                }
                this.props.setAuth(payload)
                this.props.history.push('/home')
                return
            }
            if(res.status === 403){
                
            }
          
        }).catch(err=>{
            console.log(err.response)
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
                {this.raiseError()}
             
                <input onChange={this.handleChange} type="text" id ="email" />
                <input onChange={this.handleChange} type="text" id ="password" />
                <button onClick={this.postLogin}>log in</button>
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