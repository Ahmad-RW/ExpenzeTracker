import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addIncome } from '../store/actions'
import { Button, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../style/forms.css'

class AddIncome extends Component {
    state = {
        incomeValue: 0,
        renderWarningMessage: false,
        renderSuccessMessage : false
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
            this.setState({
                renderWarningMessage : true
            }) 
            return
        }
        const payload = {
            userData: this.props.userData,
            income: this.state.incomeValue
        }
        this.props.addIncome(payload, this)
    }
    renderSuccessMessage = () =>{
        // if(this.state.renderSuccessMessage){
            return (this.state.successMessage)
        // }
        
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
                {this.renderWarningMessage()}
                {this.renderSuccessMessage()}
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
        addIncome: (payload, component) => dispatch(addIncome(payload, component))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddIncome)