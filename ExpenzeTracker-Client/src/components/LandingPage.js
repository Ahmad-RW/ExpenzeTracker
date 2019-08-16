import React,{Component} from 'react'
import '../style/landingpage.css'
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
                <div class="links">
                    <Icon name="github" size="big" /> <Icon name="envelope" size="big" /> <Icon name="question" size="big" />
                </div>
                <div class="landing-page">
                    <div class="welcome">
                        {this.renderSuccessfulLoginMessage()}
                        <h1>Expenze</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, labore.</p>
                    </div>
                    <Register />
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default LandingPage