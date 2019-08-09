import React, { Component } from 'react'
import CategoryHeader from './CategoryHeader'
import { connect } from 'react-redux'
import Logs from './Logs';

class Category extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
        console.log(this.props.logs)
        if (this.props.context === null) {
            this.props.history.push("/NotFound")
        }


    }
 
    render() {
        return (
            <React.Fragment>
                <CategoryHeader />
                <h1 >this cat's name is {this.props.context.name}</h1>
                <Logs category_id={this.props.context._id} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData,
        context: state.context,
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);

