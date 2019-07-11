import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addIncome } from '../store/actions'
import { Button, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../style/forms.css'
import {getFeedbackMessage} from './helpers'
class AddIncome extends Component {
    state = {
        incomeValue: 0,
      
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    isOnlyDigits = () =>{
        return /^\d+$/.test(this.state.incomeValue)
    }
    handleAddIncome = e => {
        if(!this.isOnlyDigits()){
            // this.setState({
            //     renderWarningMessage : true
            // }) 
            getFeedbackMessage(this, "Error", "Please enter numbers only", "Error")
            return
        }
        const payload = {
            userData: this.props.userData,
            income: this.state.incomeValue
        }
        this.props.addIncome(payload )
    }
 
    renderWarningMessage = () => {
        if (this.state.renderWarningMessage) {
            return (
                <Message error header='Error' content="Please enter numbers only." />
            )
        }
    }
    render() {
        return (
            <React.Fragment>
                <input type="text" id="incomeValue" onChange={this.handleChange} />
                <Button onClick={this.handleAddIncome}>Add</Button>
                {this.state.feedbackMessage}
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
        addIncome: (payload) => dispatch(addIncome(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddIncome)