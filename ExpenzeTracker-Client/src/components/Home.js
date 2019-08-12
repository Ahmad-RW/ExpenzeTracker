import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainHeader from './MainHeader'
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm';
import Logs from './Logs'
import { Modal } from 'semantic-ui-react';
import Navbar from './Navbar'
class Home extends Component {
    constructor(props) {
        super(props)
        console.log(props, "im in  home")
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
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