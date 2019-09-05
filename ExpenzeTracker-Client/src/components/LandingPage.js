import React,{Component} from 'react'
import '../style/landingpage.css'
import '../style/userform.css'
import Register from './account/Register'
import Login from './account/Login'
import { Icon } from 'semantic-ui-react';




class LandingPage extends Component{

    state = {
        
    }

    renderSuccessfulLoginMessage = () =>{
        if(typeof this.props.location.state !== 'undefined'){
            if(this.props.location.state.registerSuccess){
            return <p>a confirmation message was sent to your mail please confirm your email</p>
            }
        }
    }
    render(){
        return (
            <React.Fragment>
            <div class="landing-page-container">
                <div class="landing-page">
                    <div class="welcome">
                        {this.renderSuccessfulLoginMessage()}
                        <h1>Expenze</h1>
                        <p>Spend wisely with Expenze</p>
                    </div>
                    <Register />
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default LandingPage