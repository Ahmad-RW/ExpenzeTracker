import React, { Component } from "react";
import "../style/mainheader.css";
import add from "../img/add.png";
import { connect } from "react-redux";
import { setMonthlyIncome } from "../store/actions";
import AddIncome from "./AddIncome";
import SetMonthlyIncome from "./SetMonthlyIncome";
import { Modal, Divider, Form, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

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
          >
            <Modal.Content>
              <Grid columns={2} relaxed="very" stackable>
                <Grid.Column>
                  <Form success error>
                    <SetMonthlyIncome />
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Form success error>
                    <label>Add Income</label>
                    <AddIncome />
                  </Form>
                </Grid.Column>
              </Grid>
              <Divider vertical>Or</Divider>
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
