import React from 'react'
import {connect} from 'react-redux'
import Login from './Login';
import {Redirect} from 'react-router-dom'
import urls from '../../router/urls';
export default function(WrappedComponent){

     class Auth extends React.Component{
        constructor(props){
            super(props)
            console.log(props, "i'm in require auth")
        }
        // componentWillMount(){
        //     if(!this.props.auth){
        //         this.
        //     }
        // }
        render(){
            return(
                <React.Fragment>
                    {console.log("auth:", this.props.auth)}
                    {this.props.auth ? (<WrappedComponent {...this.props} />) : (<Redirect to={urls.login} />)}
                </React.Fragment>
            )
        }
    }
    const mapStateToProps = state =>{
        return {
            auth : state.auth
        }
    }

    return connect(mapStateToProps, null)(Auth)
}



