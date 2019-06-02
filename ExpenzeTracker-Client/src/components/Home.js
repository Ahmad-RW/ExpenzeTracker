import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainHeader from './MainHeader'
import CatagoryList from './CatagoryList'
import CatagoryForm from './CatagoryForm';

class Home extends Component {


    render() {
        return (
            <React.Fragment>
                <MainHeader />
                <h1>Home Page</h1>
                <CatagoryForm />
                <hr />
                <CatagoryList />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)