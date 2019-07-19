import React, { Component } from 'react'
import CategoryHeader from './CategoryHeader'
import { connect } from 'react-redux'
import { handleRename } from '../store/actions'
class Category extends Component {
 
    constructor(props) {
        super(props)
        console.log(props)
       this.state={
           newName : "",
          
       }
      
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
        
        // if(typeof this.props.location.state ==="undefined"){
        //     this.props.history.push("/NotFound")
        // }
        // const categoryinContext = this.props.location.state.category
       
        return (
            <React.Fragment>
                <CategoryHeader />
            {this.state.feedbackMessage}
                <h1 >this cat's name is {this.props.context.name}</h1>
                <label>Rename category</label>
                <input type="text" id="categoryName" onChange={this.handleNewName} placeholder="new category name" />
                <button onClick={this.handleRename} >Rename</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Category);

