import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class Category extends Component {
 
    constructor(props) {
        super(props)
        console.log(props)
       
    }
    catDoesNotExist = (cat_id) =>{
        let result = true
        this.props.userData.category.forEach(element => {
            if(element._id === cat_id){
                result = false
            }
        });
        return result
    }
    render() {
        if(typeof this.props.location.state ==="undefined"){
            this.props.history.push("/NotFound")
        }
        const categoryinContext = this.props.location.state.category
        return (
            <React.Fragment>
                <h1 >this cat's name is {categoryinContext.name}</h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(Category);

