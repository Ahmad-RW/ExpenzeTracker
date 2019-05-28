import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addIncome } from '../store/actions';

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
        if(this.state.renderSuccessMessage){
            return(<h4>Income Added! :D</h4>)
        }
        
    }
    renderWarningMessage = () => {
        if (this.state.renderWarningMessage) {
            return (
                <h3>error</h3>
            )
        }
    }
    render() {
        return (
            <React.Fragment>
                <input type="text" id="incomeValue" onChange={this.handleChange} />
                <a href="javascript:void(0)" onClick={this.handleAddIncome}>Add Income</a>
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