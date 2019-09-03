import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addIncome } from '../store/actions'
import { Input, Button, Message, Form } from 'semantic-ui-react'
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
        this.props.addIncome(payload,this)
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
                <Form.Group widths="equal">
                <Input placeholder="amount" type="text" id="incomeValue" onChange={this.handleChange} />
               {
                   this.state.incomeValue === 0? ( <Button disabled onClick={this.handleAddIncome}>Add</Button>) :( <Button onClick={this.handleAddIncome}>Add</Button>)
               }
               </Form.Group>
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
        addIncome: (payload, component) => dispatch(addIncome(payload,component))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddIncome)