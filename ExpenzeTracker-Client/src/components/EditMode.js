import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editCategories, deleteCategory } from '../store/actions'
import { Input, Form, Button, Icon, Label, Progress } from 'semantic-ui-react'
import { CircularProgressbar } from "react-circular-progressbar";
import '../style/forms.css'
import 'react-circular-progressbar/dist/styles.css';
import { checkIfInputIsNotNumber } from './helpers'

class EditMode extends Component{
    
  state = { 
    total : 100
  }
 
  cancelEditMode = () => {
    this.setState({
      total: 100
    })
    this.props.cancelEditMode()//so that the parent returns his view 
  }

  saveChanges = e => {
    e.preventDefault()
    const { categoryName: categoryName, editingMode, total, renderSuccessMessage, ...categories } = this.state//destructuring
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
       
  //some documentation as clear as I can:
  //I implemented this solution, but I think I have another one i'll try it might be simpler but i'll finish this use case end-to-end first then refactor
  //this function is called whenever a change in one of the input fields occurs. 
  handelShareChange = e => {//this algorithm is one of my children. 
    this.checkRemainingShare(e)//if he enters a value but the total is 0;
    checkIfInputIsNotNumber(e)//if he enters a characters;
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
      
  handleDelete = category => {
    console.log(category)
    const payload = {
      userData: this.props.userData,
      category
    }
    this.props.deleteCategory(payload, this)
  }
    

  render() {
    return (
      <div class="edit-mode">
        <Progress percent={this.state.total} progress />
        <Form id="editForm" class="input-fields" onSubmit={this.saveChanges}>
          {this.props.userData.category.map(cat => {
            //iteratre over categories
            return (
              <div class="edit-cat">
                <Button icon negative
                type="button"
                  onClick={() => { this.handleDelete(cat);}}>
                  <Icon name="minus square outline" />
                </Button>
                <Input
                  onChange={this.handelShareChange}
                  className="inputField"
                  id={cat._id}
                  labelPosition="right"
                >
                  <Label basic>{cat.name}</Label>
                  <input />
                  <Label>%</Label>
                </Input>
              </div>
            );
          })}
          <Button type="submit">Save</Button>
          <Button type="button" inverted color="red" onClick={this.cancelEditMode}>
            Cancel
          </Button>
        </Form>
        <div class="progress">
          {/* <CircularProgressbar
            value={100 - this.state.total}
            maxValue={100}
            text={`${100 - this.state.total}%`}
          /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      userData: state.userData
    }
  }
const mapDispatchToProps = dispatch => {
    return {
      editCategories: (payload, component) => { dispatch(editCategories(payload, component)) },
      deleteCategory: (payload, component) => { dispatch(deleteCategory(payload, component)) }
  
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(EditMode)