import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCatagory, editCatagories } from '../store/actions'
class CatagoryForm extends Component { //this component lookin extra thicc

    state = {
        catagoryName: "",
        editingMode: false,
        total: 100,
        renderSuccessMessage: false
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


    cancelEditMode = () => {
        this.setState({
            editingMode: false,
            total: 100
        })

    }


    saveChanges = e => {
        e.preventDefault()
        const { catagoryName, editingMode, total, renderSuccessMessage, ...catagories } = this.state//destructuring
        const payload = {
            catagories,
            userData: this.props.userData
        }
        this.props.editCatagories(payload, this)
    }


    handleTotalOutOfBounds = number => {
        if (number < 0) {
            return 0
        }
        if (number > 100) {
            return 100
        }
        return number
    }


    checkRemainingShare = e => {
        if (this.state.total === 0) {
            e.target.value = 0;
        }
    }

    checkIfInputIsNotNumber = e => {
        if (isNaN(e.target.value)) {
            e.target.value = 0
        }
    }

    //some documentation as clear as I can:
    //I implemented this solution, but I think I have another one i'll try it might be simpler but i'll finish this use case end-to-end first then refactor
    //this function is called whenever a change in one of the input fields occurs. 
    handelShareChange = e => {//this algorithm is one of my children. 
        this.checkRemainingShare(e)//if he enters a value but the total is 0;
        this.checkIfInputIsNotNumber(e)//if he enters a characters;
        const newShare = e.target.value//this line takes the new value
        const oldShare = this.state[e.target.id]//this line takes the old value at first it might be undefined becasue the first time he inputs values there is no old share.
        if (typeof oldShare !== "undefined" && oldShare > newShare) {//this code block checks if he for example enters at first 15 then enters 10. the lost 5 needs to go back to total share. 
            const difference = oldShare - newShare
            let newTotal = this.state.total + difference
            newTotal = this.handleTotalOutOfBounds(newTotal)
            this.setState({
                total: newTotal,//the field total is the where we store the total un-assigned shares
                [e.target.id]: newShare,//we also keep up, in the state obj, each catagory and the share it currently has (by currently I mean the value last entered in the input field, not the value in the db)
            })
        }
        else {//this case is the default case, it fires when the user inputs a number. the first case is when he reduces the number
            let difference = newShare - oldShare  //this calculates the difference of the last entered number(oldShare) and the newwest entered number(newShare) and we subtract it from the total share
            if (typeof oldShare === "undefined") {//this covers the case for the first number entered in the whole process
                difference = newShare - 0
            }
            let newTotal = this.state.total - difference
            newTotal = this.handleTotalOutOfBounds(newTotal)
            this.setState({
                total: newTotal,//subtract from the total
                [e.target.id]: newShare//update the catagory current share
            })
        }
    }



    renderSuccessMessage = () => {
        if (this.state.renderSuccessMessage) {
            return (
                <h4>Changes Saved</h4>
            )
        }
    }



    listCatagories = () => {
        if (this.state.editingMode) {
            return <form id="editForm" onSubmit={this.saveChanges} >
                {this.state.total}
                {this.props.userData.catagory.map(cat => {//iteratre over catagories
                    return (
                        <div>
                            <b>{cat.name}</b>. precentage : <input onChange={this.handelShareChange} className="inputField" id={cat._id} defaultValue="0" size="1"/>% balance :{cat.balance}
                        </div>
                    )

                })}
                <button href="javascript:void(0)" type="submit">Save</button>
                <a href="javascript:void(0)" onClick={this.cancelEditMode}>Cancel</a>

            </form>
        }
        else {
            return (
                <div>
                    {this.renderSuccessMessage()}
                    <ul>
                        {this.props.userData.catagory.map(cat => {//iterate over catagories
                            return (
                                <li><b>{cat.name}</b>. precentage : {cat.share}% balance :{cat.balance}</li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
    }




    render() {
        return (
            <React.Fragment>
                <label for="catagory-name">Create new catagory</label>
                <input type="text" placeholder="catagory name" id="catagoryName" onChange={this.handleNameChange} />
                <button onClick={this.createCatagory}>Create</button>
                <a href="javascript:void(0)" onClick={() => { this.setState({ editingMode: true }) }}>Edit Shares</a>
                {this.listCatagories()}
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
        createCatagory: (payload) => { dispatch(createCatagory(payload)) },
        editCatagories: (payload, component) => { dispatch(editCatagories(payload, component)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CatagoryForm)