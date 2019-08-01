import React, { Component } from "react";
import "../style/mainheader.css";
import add from "../img/add.png";
import { connect } from "react-redux";
import { setMonthlyIncome } from "../store/actions";
import AddIncome from "./AddIncome";
import { Modal, Form, Tab } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import RegisterExpense from "./RegisterExpense";
import Transfer from './Transfer'
const panes = [
  {
    menuItem: "Income",
    render: () => (
      <Tab.Pane>
        <AddIncome />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Expense",
    render: () => (
      <Tab.Pane>
        <RegisterExpense />
      </Tab.Pane>
    )
  },
  { menuItem: "Transfer", render: () => <Tab.Pane><Transfer /></Tab.Pane> }
];

class MainHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="main">
          <div class="main-balance">
            <span>Balance: </span>
            <span class="">{this.props.userData.balance}</span>
          </div>
          <div class="monthly-income">
            <span>Monthly Income: </span>
            <span>
              {this.props.userData.monthlyIncome.amount
                ? this.props.userData.monthlyIncome.amount
                : "Loading..."}
            </span>
          </div>

          <Modal
            trigger={<img class="add" src={add} alt="add" />}
            centered={false}
            size="tiny"
          >
            <Modal.Content>
              <Form success error>
                <Tab panes={panes} />
              </Form>
            </Modal.Content>
          </Modal>
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
    setMonthlyIncome: payload => dispatch(setMonthlyIncome(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainHeader);
