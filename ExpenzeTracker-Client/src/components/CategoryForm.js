import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCategory, editCategories } from '../store/actions'
import { Input, Form, Button, Icon, Progress } from 'semantic-ui-react'
import '../style/forms.css'
class CategoryForm extends Component {

    state = {
        categoryName: "",
        editingMode: false,
        total: 100,
        renderSuccessMessage: false,
        renderNameErrorMessage : null
    }



    handleNameChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    createCategory = e => {
        const payload = {
            categoryName: this.state.categoryName,
            userData: this.props.userData
        }
        if(this.checkEmptyName(payload.categoryName)){//validation begin
            this.setState({
                renderNameErrorMessage : "Category name cannot be empty"
            }, ()=>{setTimeout(() => {
                this.setState({
                    renderNameErrorMessage : null
                })
            }, 5000)})
            return//return from submission
        }
        if(this.checkCharLimit(payload.categoryName)){
            this.setState({
                renderNameErrorMessage : "Category name is too long"
            }, ()=>{setTimeout(() => {
                this.setState({
                    renderNameErrorMessage : null
                })
            }, 5000)})
            return
        }// validation end
        this.props.createCategory(payload)
    }


    cancelEditMode = () => {
        this.setState({
            editingMode: false,
            total: 100
        })

    }

    checkEmptyName = (categoryName) => {
        return categoryName.length === 0
    }
    checkCharLimit = (categoryName) =>{
        return categoryName.length >= 13
    }
    saveChanges = e => {
        e.preventDefault()
        const { categoryName: categoryName, editingMode, total, renderSuccessMessage, ...categories } = this.state//destructuring
        console.log(categories)
        const payload = {
            categories,
            userData: this.props.userData
        }
        this.props.editCategories(payload, this)
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
                [e.target.id]: newShare,//we also keep up, in the state obj, each category and the share it currently has (by currently I mean the value last entered in the input field, not the value in the db)
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
                [e.target.id]: newShare//update the category current share
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

    renderNameErrorMessage = () =>{
        return this.state.renderNameErrorMessage ? ( <h4>{this.state.renderNameErrorMessage}</h4>) : (<React.Fragment></React.Fragment>)
    }


    listCategories = () => {
        if (this.state.editingMode) {
            return <Form inline id="editForm" onSubmit={this.saveChanges} >
                <Progress percent={this.state.total} progress />
                {this.props.userData.category.map(cat => {//iteratre over categories
                    return (
                        <div>
                            <label><b>{cat.name}</b></label>
                            <Input onChange={this.handelShareChange} type="number" max="100" min="0" className="inputField" id={cat._id} />
                        </div>
                    )

                })}
                <Button type="submit">Save</Button>
                <button class="ui inverted red button" onClick={this.cancelEditMode}>Cancel</button>

            </Form>
        }
        else {
            return (
                <div>
                    {this.renderSuccessMessage()}
                    {this.renderNameErrorMessage()}
                    <ul class="">
                        {this.props.userData.category.map(cat => {//iterate over categories
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
                <label for="category-name">Create new category</label>
                <Input type="text" placeholder="category name" id="categoryName" onChange={this.handleNameChange} />
                <Button icon onClick={this.createCategory}><Icon name="plus"></Icon></Button>
                <Button icon onClick={() => { this.setState({ editingMode: true }) }}><Icon name="edit"></Icon></Button>
                {this.listCategories()}
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
        createCategory: (payload) => { dispatch(createCategory(payload)) },
        editCategories: (payload, component) => { dispatch(editCategories(payload, component)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)