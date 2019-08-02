import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCategory } from '../store/actions'
import { Input, Button, Icon, Label, Modal } from 'semantic-ui-react'
import '../style/forms.css'
import { checkEmptyName, getFeedbackMessage } from './helpers'
import EditMode from './EditMode';
class CategoryForm extends Component {
  state = {
    categoryName: "",
    editingMode: false
  };

  cancelEditMode = () => {
    this.setState({
      editingMode: false
    });
  };
  handleNameChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  createCategory = e => {
    const payload = {
      categoryName: this.state.categoryName,
      userData: this.props.userData
    };
    if (checkEmptyName(payload.categoryName)) {
      //validation begin
      getFeedbackMessage(
        this,
        "Category name Error",
        "Category name cannot be empty",
        "error"
      ); //god bless refactoring :)

      return; //return from submission
    }
    if (this.checkCharLimit(payload.categoryName)) {
      getFeedbackMessage(
        this,
        "Category name Error",
        "Category name is too long",
        "error"
      );
      return;
    }

    if (!this.isNameUnique(payload.categoryName)) {
      getFeedbackMessage(
        this,
        "Category name Error",
        "Category name must be unique",
        "error"
      );
      return;
    } // validation end. refactor these validation routines into external function !!importants

    this.props.createCategory(payload);
  };

  checkCharLimit = categoryName => {
    return categoryName.length >= 13;
  };

  isNameUnique = categoryName => {
    let result = true;
    this.props.userData.category.forEach(elem => {
      if (elem.name === categoryName) {
        result = false;
      }
    });
    return result;
  };

  listCategories = () => {
    if (this.state.editingMode) {
      return <EditMode cancelEditMode={this.cancelEditMode} />;
    } else {
      return (
        <div>
          <ul class="cat-form-list">
            {this.props.userData.category.map(cat => {
              //iterate over categories
              return (
                <li>
                  <div>{cat.name}</div> <div>{cat.share}% </div>
                  <div>{cat.balance.toFixed(2)}</div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <Modal.Header>
          {this.state.feedbackMessage}
          <div class="cat-form-header">
            <Input
              type="text"
              placeholder="category name"
              id="categoryName"
              onChange={this.handleNameChange}
              labelPosition="left"
            >
              <Label basic for="category-name">
                Create new category
              </Label>
              <input />
            </Input>
            {this.state.categoryName === "" ? ( //disabled button if category name === ""
              <Button disabled icon onClick={this.createCategory}>
                <Icon name="plus" />
              </Button>
            ) : (
              <Button icon onClick={this.createCategory}>
                <Icon name="plus" />
              </Button>
            )}
            <Button icon
              onClick={() => {this.setState({ editingMode: true });}}
            >
              <Icon name="edit" />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Content scrolling>{this.listCategories()}</Modal.Content>
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
    createCategory: payload => {
      dispatch(createCategory(payload));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
