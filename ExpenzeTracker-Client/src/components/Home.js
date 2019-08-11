import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainHeader from './MainHeader'
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm';
import Logs from './Logs'
import { Modal } from 'semantic-ui-react';
class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <MainHeader />        
                <CategoryList />
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