import React, { Component } from 'react'
import { checkIfInputIsNotNumber,getFeedbackMessage, getCategory } from './helpers'
import { connect } from 'react-redux'
import { transfer} from '../store/actions'
import { Button } from 'semantic-ui-react'
import '../style/forms.css'
class Transfer extends Component {
    state = {
        to: null,
        from: null,
        amount: 0
    }


    handleOptionChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleAmountChange = (e) => {
        checkIfInputIsNotNumber(e)
        if(e.target.value < 0){
            e.target.value = 0
        }
        this.setState({
        amount: e.target.value
        })
     
    }
    submitTransfer = () =>{
        if(this.state.to === null || this.state.from ===null){
            getFeedbackMessage(this, "InvalidOperation", "please select categories", "error")
            return
        }
        if(this.state.to === this.state.from){
            getFeedbackMessage(this, "InvalidOperation", "please select different categories", "error")
            return
        }
        const toCategory = getCategory(this.state.to, this.props.userData.category)
        const FromCategory = getCategory(this.state.from, this.props.userData.category)
        if(FromCategory.balance < this.state.amount){
            getFeedbackMessage(this, "InvalidOperation", "balance of category is not enough to complete the operation", "error")
            return
        }
        
        const payload = {
            to : this.state.to,
            from : this.state.from,
            amount : this.state.amount,
            userData : this.props.userData
        }
        this.props.handleTransfer(payload, this)
    }
    render() {
        const optionList = this.props.userData.category.map(elem => {
            if(elem.deleted){
                return
            }
            return (<option value={elem._id}>{elem.name}</option>)
        })
        return (
            <React.Fragment>
                {this.state.feedbackMessage}
                <div class="transfer">
                <select onChange={this.handleOptionChange} id="to">
                    <option value={null}>To</option>
                    {optionList}
                </select>
                </div>
                <div class="transfer">
                <select onChange={this.handleOptionChange} id="from">
                    <option value={null}>From</option>
                    {optionList}
                </select>
                </div>
                <div class="transfer">
                <input type="text" id="amount" onChange={this.handleAmountChange} />
                </div>
                <Button onClick={this.submitTransfer}>Submit</Button>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        userData: state.userData,
        context: state.context
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleTransfer : (payload, component)=>{dispatch(transfer(payload, component))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transfer)