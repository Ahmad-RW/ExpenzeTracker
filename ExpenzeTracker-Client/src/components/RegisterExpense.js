import React, { Component } from "react"
import { connect } from 'react-redux'
import { checkIfInputIsNotNumber } from "./helpers";
import { Input, Button } from "semantic-ui-react";
import { submitExpense } from "../store/actions";
import { getFeedbackMessage } from './helpers'
class RegisterExpense extends Component {


    state = {
        selectedCategoryId: null,
        amount: 0,
        renderAmountTooLargeError: false,
    }



    setSelectedCategory = e => {
        this.setState({
            selectedCategoryId: e.target.value
        })
    }


    renderDropDownListForCats = () => {
        const list = this.props.userData.category.map(elem => {
            if(elem.deleted){
                return
            }
            return (
                <option value={elem._id} id={elem._id}>{elem.name}</option>
            )
        })

        return (
            <select onChange={this.setSelectedCategory}>
                <option id={null}>select category</option>
                {list}
            </select>)
    }


    renderForm = () => {
        if (this.state.selectedCategoryId === null) {
            return
        }
        const submitButton = this.state.amount === 0 ? (<Button disabled onClick={this.submitExpense}>Submit</Button>) : (<Button onClick={this.submitExpense}>Submit</Button>)
        return (
            <React.Fragment>
                <h5>Enter amount</h5>
                <Input type="text" onChange={this.handleAmount} />
                {submitButton}
            </React.Fragment>
        )
    }

    handleAmount = e => {
        checkIfInputIsNotNumber(e)
        this.setState({
            amount: e.target.value
        })
    }

    submitExpense = () => {
        const payload = {
            category_id: this.state.selectedCategoryId,
            amount: this.state.amount,
            userData: this.props.userData
        }

        const categoryInContext = this.props.userData.category.find(elem => {
            return elem._id === payload.category_id
        })
        if (payload.amount > categoryInContext.balance) {
            getFeedbackMessage(this, "transaction terminated", "amount of expense is grater than the current balance of the category", "error")
            return
        }
        this.props.submitExpense(payload, this)
    }


    render() {
        return (
          <React.Fragment>
            {this.renderDropDownListForCats()}
            {this.renderForm()}
            {this.state.feedbackMessage}
          </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitExpense: (payload, component) => { dispatch(submitExpense(payload, component)) }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterExpense);
