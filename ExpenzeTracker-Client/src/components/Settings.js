import React, { Component } from 'react'
import SetMonthlyIncome from './SetMonthlyIncome'

class Settings extends Component {
  render() {
    return <React.Fragment>
        <h1>This is the Settings</h1>
        <SetMonthlyIncome />
    </React.Fragment>;
  }
}

export default Settings;
