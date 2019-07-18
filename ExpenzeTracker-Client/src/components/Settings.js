import React, { Component } from 'react'
import SetMonthlyIncome from './SetMonthlyIncome'
import '../style/settings.css'
import { Form, Segment, Modal } from "semantic-ui-react"




class Settings extends Component {

  
  render() {
    return (
      <React.Fragment>
        <div class="settings-container">
          <div class="settings-profile">
            <h1>Profile shit</h1>
          </div>
          <div class="settings-list">
            <Segment.Group>
              <Modal
                trigger={<Segment>Set monthly income</Segment>}
                centered={false}
              >
                <Modal.Content>
                  <Form>
                    <SetMonthlyIncome />
                  </Form>
                </Modal.Content>
              </Modal>
              <Segment>aaaa</Segment>
              <Segment>aaaa</Segment>
              <Segment>aaaa</Segment>
              <Segment>aaaa</Segment>

            </Segment.Group>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Settings;
