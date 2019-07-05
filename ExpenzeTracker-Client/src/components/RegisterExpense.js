import React, { Component } from "react"
import { connect } from 'react-redux'
import { checkIfInputIsNotNumber } from "./helpers";
import { Input } from "semantic-ui-react";
import { submitExpense } from "../store/actions";
class RegisterExpense extends Component {


    state = {
        selectedCategoryId : null,
        amount: 0,
    }

    

    setSelectedCategory = e =>{
        this.setState({
            selectedCategoryId : e.target.id
        })
    }


    renderDropDownListForCats = () => {
        const list = this.props.userData.category.map(elem => {
            return (
                <option onClick={this.setSelectedCategory} value={elem._id} id={elem._id}>{elem.name}</option>
            )
        })

        return (
        <select>
            <option id={null}>select category</option>
            {list}
        </select>)
    }


    renderForm = () =>{
        if(this.state.selectedCategoryId === null){
            return
        }
        const submitButton = this.state.amount ===0 ? (<button disabled onClick={this.submitExpense}>Submit</button>) :(<button onClick={this.submitExpense}>Submit</button>)
        return(
            <React.Fragment>
            <h5>Enter amount</h5>
            <Input type="text" onChange={this.handleAmount} />
            {submitButton}
            </React.Fragment>
        )
    }

    handleAmount = e =>{
       checkIfInputIsNotNumber(e)
        this.setState({
            amount : e.target.value
        })
    }

    submitExpense = () =>{
        const payload = {
            category_id : this.state.selectedCategoryId,
            amount : this.state.amount,
            userData : this.props.userData
        }
        this.props.submitExpense(payload, this)
    }



    render() {
        console.log(this.state.selectedCategoryId)
        return (
            <React.Fragment>
                {this.state.successMessage}
                {this.renderDropDownListForCats()}
                {this.renderForm()}
            </React.Fragment>

        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitExpense : (payload, component) =>{dispatch(submitExpense(payload, component))}
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterExpense);
