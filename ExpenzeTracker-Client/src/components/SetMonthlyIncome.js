import React, { Component } from 'react'
import { setMonthlyIncome } from '../store/actions'
import { connect } from 'react-redux'
import { Form,Dropdown, Button } from 'semantic-ui-react'

import '../style/forms.css'
import { equal } from 'assert';

const days = [
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '5', value: 5 },
  { key: 6, text: '6', value: 6 },
  { key: 7, text: '7', value: 7 },
  { key: 8, text: '8', value: 8 },
  { key: 9, text: '9', value: 9 },
  { key: 10, text: '10', value: 10 },
  { key: 11, text: '11', value: 11 },
  { key: 12, text: '12', value: 12 },
  { key: 13, text: '13', value: 13 },
  { key: 14, text: '14', value: 14 },
  { key: 15, text: '15', value: 15 },
  { key: 16, text: '16', value: 16 },
  { key: 17, text: '17', value: 17 },
  { key: 18, text: '18', value: 18 },
  { key: 19, text: '19', value: 19 },
  { key: 20, text: '20', value: 20 },
  { key: 21, text: '21', value: 21 },
  { key: 22, text: '22', value: 22 },
  { key: 23, text: '23', value: 23 },
  { key: 24, text: '24', value: 24 },
  { key: 25, text: '25', value: 25 },
  { key: 26, text: '26', value: 26 },
  { key: 27, text: '27', value: 27 },
  { key: 28, text: '28', value: 28 },
  { key: 29, text: '29', value: 29 },
  { key: 30, text: '30', value: 30 },
  { key: 31, text: '31', value: 31 },
]
class SetMonthlyIncome extends Component {
    state = {
        amount: 0,
        payrollDay : "",
        payrollMonth : ""
    }
    handleDayInput = e => {
        console.log(e.target)
        this.setState({
           payrollDay: e.target.innerText
        })
        console.log(this.state)
    }
    handleChange = e => {
        console.log(e.target)
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
    }
    handleSetMonthlyInput = e => {
        e.preventDefault()
        const date = `${this.state.payrollDay}`
        console.log(date)
        const payload = {
            userData: this.props.userData,
            amount: this.state.amount,
            payrollDate : date

        }
        this.props.setMonthlyIncome(payload)
    }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSetMonthlyInput}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid onChange={this.handleChange} type="number" id="amount" />
                        <Form.Select fluid placeholder='Payroll Day' selection id="payrollDay" name="day" options={days} onChange={this.handleDayInput}/>
                        <Button onClick={this.handleSetMonthlyInput}>Set</Button>
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMonthlyIncome: (payload) => dispatch(setMonthlyIncome(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SetMonthlyIncome)