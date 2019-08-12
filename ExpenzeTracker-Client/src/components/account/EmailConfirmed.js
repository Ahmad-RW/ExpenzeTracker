import React,{Component} from 'react'
import {Link } from 'react-router-dom'
import urls from '../../router/urls';
class EmailConfirmed extends Component{


    render(){
        return(
            <React.Fragment>
                <h2>yay you can <Link to={urls.login}>sign in now</Link> :D</h2>
            </React.Fragment>
        )
    }
}


export default EmailConfirmed