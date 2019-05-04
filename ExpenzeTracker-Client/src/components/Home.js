import React, { Component } from 'react'

import Navbar from './Navbar'
import MainHeader from './MainHeader';
class Home extends Component {

    render() {
        
        return (
            <React.Fragment>
                <MainHeader />
                <h1>Home Page</h1>
            </React.Fragment>
        )
    }
}


export default Home