import React, { Component } from 'react'
import SetMonthlyIncome from './SetMonthlyIncome'
import '../style/settings.css'
import { Accordion, Header, Icon, Form, Segment, Modal } from "semantic-ui-react"
import {connect} from 'react-redux'

import {getCategory } from './helpers'



class Settings extends Component {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  listLogs = () => {
    return this.props.logs.map(log => {
        return(
            <div>
            action :  { log.action} ,, amount : {log.amount},, category : {log.category_id === null ? (<span>all categories</span>) :(getCategory(log.category_id, this.props.userData.category).name)}
            </div>
        )
    })
}
  render() {
    const { activeIndex } = this.state;

    return (
      <React.Fragment>
        <div class="settings-container">
          <div class="settings-profile">
            <Header as="h2" icon textAlign="center">
              <Icon name="user" circular />
              <Header.Content>John Doe</Header.Content>
            </Header>
          </div>
          <div class="settings-list">
            <Accordion fluid styled>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                Set monthly income
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <SetMonthlyIncome />
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                What kinds of dogs are there?
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1} />
              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                How do you acquire a dog?
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2} />
            </Accordion>
          </div>
        </div>
        {this.listLogs()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
      userData: state.userData,
      context: state.context,
      logs: state.logs
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

