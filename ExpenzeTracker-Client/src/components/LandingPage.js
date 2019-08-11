import React,{Component} from 'react'




class LandingPage extends Component{

    state = {

    }

    renderSuccessfulLoginMessage = () =>{
        if(typeof this.props.location.state !== 'undefined'){
            if(this.props.location.state.registerSuccess){
            return <h1>yay you can sign in now</h1>
            }
        }
    }
    render(){
        console.log(this.props)
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