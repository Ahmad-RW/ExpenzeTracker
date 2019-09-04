import React, { Component } from 'react'
import { Input, Button, Icon } from "semantic-ui-react";
import "../style/categoryheader.css";
import "../style/forms.css"
import { connect } from 'react-redux'
import { handleRename } from '../store/actions'
class CategoryHeader extends Component {



   state={
        newName : this.props.context.newName,
        rename : false
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
        this.props.handleRename(payload, this);
        document.getElementById('categoryName').value = '';

    }

    toggleRename = () => {
        this.state.rename = !this.state.rename;
    }

    render() {
        return (
            <React.Fragment>
                {this.state.feedbackMessage}
                <div class="cat-header-container">
                    {this.state.rename === false ?
 
                    (<span class="cat-header-name">{this.props.categoryName}</span>):( 
                    <Input type="text" id="categoryName" onBlur={this.handleRename} 
                    onChange={this.handleNewName} placeholder={this.props.categoryName} />)}
                    <Icon class="rename" onClick={() => {this.setState({ rename: !this.state.rename});}} name="edit" />
                </div>
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

