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
        const balance = cat.balance.toLocaleString(undefined, { minimumFractionDigits: 2 }).split(".");
        console.log(balance);
        return (

          <Modal class="my-modal" size="small" centered={false}
            trigger={
              <Link
                onClick={() => {
                  this.props.setContext(cat);
                }}
              >
                <div class="cat">
                  <div class="cat-name">
                    {cat.name}
                  </div>
                  <div class="cat-balance">
                    {balance[0]}<span class="decimal">.{balance[1]}</span>
                  </div>
                  <div class="cat-share">{cat.share}%</div>
                </div>
              </Link>}>
            <Category />
          </Modal>

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
