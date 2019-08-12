import React,{Component} from 'react'




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
                {this.renderSuccessfulLoginMessage()}
            <h1>landing</h1>
            <h2>page</h2>
            </React.Fragment>
        )
    }
}

export default LandingPage