import React, { Component } from 'react'
import { setMonthlyIncome } from '../store/actions'
import { connect } from 'react-redux'
class SetMonthlyIncome extends Component {
    state = {
        amount: 0,
        payrollDay : "",
        payrollMonth : ""
    }
    handleChange = e => {
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
                <form onSubmit={this.handleSetMonthlyInput}>
                    <label>Set Monthly Income</label>
                    <input onChange={this.handleChange} type="number" id="amount" />
                    <span>
                        <select id="payrollDay" name="day" onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                    </span>
                    <a href="javascript:void(0)" onClick={this.handleSetMonthlyInput}>Set</a>
                </form>

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