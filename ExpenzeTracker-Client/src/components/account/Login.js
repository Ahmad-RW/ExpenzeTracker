import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


class Login extends Component{

    state = {
        email : "",
        password : "",
        authError : false
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    postLogin = () =>{
        const payload = {
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
          
        }).catch(err=>{
            this.setState({authError : true})
        })
    }

    raiseAuthError = () =>{
        if(this.state.authError){
            return <h1>password and/or email is wrooong</h1>
        }
    }

   
    render(){
        return(
            <React.Fragment>
                {this.raiseAuthError()}
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