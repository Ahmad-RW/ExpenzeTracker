import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainHeader from './MainHeader'
import CategoryList from './CategoryList'
import Navbar from './Navbar'
import CalculatorContainer from './calculator/CalculatorContainer';
import { Modal } from 'semantic-ui-react';
class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Modal trigger={<a>catch-ulator</a>}>
                <CalculatorContainer />

                </Modal>
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