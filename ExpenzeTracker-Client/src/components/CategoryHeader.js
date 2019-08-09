import React, { Component } from 'react'
import {} from "semantic-ui-react";
import "../style/categoryheader.css";

import { connect } from 'react-redux'
import { handleRename } from '../store/actions'
class CategoryHeader extends Component {



   state={
        newName : this.props.context.newName,
       
    }
    handleNewName = (e) =>{
        this.setState({
            newName : e.target.value
        })
    }
  

    handleRename = () =>{
        const payload={
            userData : this.props.userData,
            newName : this.state.newName,
            categoryId : this.props.context._id
        }
        this.props.handleRename(payload, this)

    }

    render() {
        return (
            <React.Fragment>
            <label>Rename category</label>
            {this.state.feedbackMessage}

                <input type="text" id="categoryName" onBlur={this.handleRename} onChange={this.handleNewName} placeholder="new category name" />
                <button onClick={this.handleRename} >Rename</button>
                <h1>This is a component for a header of a category</h1>
            </React.Fragment>
        )
    }
}



const mapStateToProps = state => {
    return {
        userData: state.userData,
        context : state.context
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleRename : (payload,Component) =>{dispatch(handleRename(payload, Component))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryHeader);

