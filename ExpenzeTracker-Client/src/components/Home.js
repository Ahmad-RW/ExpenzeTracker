import React, { Component } from 'react'
import {connect } from 'react-redux'
import Navbar from './Navbar'
import MainHeader from './MainHeader';
class Home extends Component {

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <MainHeader />
                <h1>Home Page</h1>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state =>{
    return {
        userData : state.userData
    }
}
export default connect(mapStateToProps)(Home)