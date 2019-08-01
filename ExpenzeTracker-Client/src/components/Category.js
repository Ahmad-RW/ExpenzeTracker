import React, { Component } from 'react'
import CategoryHeader from './CategoryHeader'
import { connect } from 'react-redux'

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
                {this.state.feedbackMessage}
                <h1 >this cat's name is {this.props.context.name}</h1>
                
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

