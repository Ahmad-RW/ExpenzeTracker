import React, { Component } from "react";
import "../style/mainheader.css";
import { connect } from "react-redux";
import { setMonthlyIncome } from "../store/actions";
import AddIncome from "./AddIncome";
import { Modal, Form, Tab, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import RegisterExpense from "./RegisterExpense";
import Transfer from "./Transfer";
import Logs from "./Logs";
const panes = [
  {menuItem: "Income",
    render: () => (
      <Tab.Pane>
        <AddIncome />
      </Tab.Pane>
    )},
  {menuItem: "Expense",
    render: () => (
      <Tab.Pane>
        <RegisterExpense />
      </Tab.Pane>
    )},
  {menuItem: "Transfer",
    render: () => (
      <Tab.Pane>
        <Transfer />
      </Tab.Pane>
    )}
];

class MainHeader extends Component {
  render() {
    console.log(this.props.userData, " hi")
    return (
      <React.Fragment>
        <div class="main">
        <div class="main-left">
          <div class="main-balance">
            <span>Balance </span>
            <span class="balance">{this.props.userData.balance.toLocaleString()}</span>
          </div>
        <div class="monthly-income">
             <span>Monthly Income: </span>
            <span>
              {this.props.userData.monthlyIncome.amount !== null
                ? this.props.userData.monthlyIncome.amount.toLocaleString()
                : "Loading..."}
            </span>
          </div>

          <Modal
          // <img class="add" src={add} alt="add" />
            trigger={<Icon name="add"/>}
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
        <Modal centered={false} size="small" trigger={ <span class="text-activity">Activities</span>}>
          <Modal.Content scrolling><Logs /></Modal.Content>
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
export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
