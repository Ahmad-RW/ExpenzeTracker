import React, { Component } from "react";
import { connect } from "react-redux";
import "../style/categorylist.css";
import { Link } from "react-router-dom";
import { setContext } from "../store/actions";
import Category from "./Category";
import { Modal } from 'semantic-ui-react'
class CategoryList extends Component {
  state = {
    renderSuccessMessage: false
  };
  listUserCategory = () => {
    const categoryList = this.props.userData.category ? (
      this.props.userData.category.map(cat => {
        if (cat.deleted) {
          return
        }
        return (
          <div class="cat">
            <div class="cat-name">
              <Modal trigger={
                <Link
                  onClick={() => {
                    this.props.setContext(cat);
                  }}
                >
                  {cat.name}
                </Link>}>
                <Modal.Header>cateogry</Modal.Header>
                <Modal.Content >
                  <Category />
                </Modal.Content>
              </Modal>
            </div>
            <div class="cat-balance">
              {cat.balance.toFixed(2)}
            </div>
            <div class="cat-share">{cat.share}%</div>
          </div>
        );
      })
    ) : (
        <p>Loading....</p>
      );
    return categoryList;
  };

  renderSuccessMessage = () => {
    if (this.state.renderSuccessMessage) {
      return <h3>POOF</h3>;
    }
  };
  render() {
    return (
      <React.Fragment>
        <div class="cat-container">
          {this.renderSuccessMessage()}
          {this.listUserCategory()}
        </div>
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
    setContext: context => {
      dispatch(setContext(context));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);
