import React, {Component } from 'react'
import {connect} from 'react-redux'
import { createCatagory } from '../store/actions'
class CatagoryForm extends Component{
    
    state = {
        catagoryName: ""
    }


    handleNameChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    createCatagory = e => {

        const payload = {
            catagoryName: this.state.catagoryName,
            userData: this.props.userData
        }
        this.props.createCatagory(payload)
    }

    render(){
        return(
            <React.Fragment>
            <label for="catagory-name">Create new catagory</label>
                <input type="text" placeholder="catagory name" id="catagoryName" onChange={this.handleNameChange} />
                <button onClick={this.createCatagory}>Create</button>
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
        createCatagory: (payload) => { dispatch(createCatagory(payload)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CatagoryForm)