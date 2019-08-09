import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainHeader from './MainHeader'
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm';
import Logs from './Logs'
class Home extends Component {

    state = {
        logView : false
    }
    changeView = () =>{
        this.setState({logView:!this.state.logView})
    }
    render() {
        return (
            <React.Fragment>
                <MainHeader changeView = {this.changeView} />
                

                {this.state.logView ? (<Logs />) : (<CategoryList />)}
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