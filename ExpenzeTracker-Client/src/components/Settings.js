import React, { Component } from 'react'
import SetMonthlyIncome from './SetMonthlyIncome'
import '../style/settings.css'
import { Header, Icon } from "semantic-ui-react"
import {connect} from 'react-redux'
import Navbar from './Navbar';
import ChangePassword from './ChangePassword';




class Settings extends Component {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <React.Fragment>
        <Navbar />
        <div class="settings-container">
          <div class="settings-profile">
            <Header as="h2" icon textAlign="center">
              <Icon name="user" circular />
              <Header.Content>John Doe</Header.Content>
            </Header>
          </div>
          <div class="settings-list">
                <SetMonthlyIncome />
                <ChangePassword/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
      userData: state.userData,
      context: state.context,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

