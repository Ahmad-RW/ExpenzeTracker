import React, { Component } from 'react'
import '../style/mainheader.css'
import { connect } from 'react-redux'
import {setMonthlyIncome} from '../store/actions'
class MainHeader extends Component {
    state ={
        incomeValue : 0
    }
    handleChange = e =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSetMonthlyInput = e => {
        e.preventDefault()
        const payload = {
            userData : this.props.userData,
            value : this.state.incomeValue
        }
        this.props.setMonthlyIncome(payload)
    }
    render() {
        return (
            <React.Fragment>
                <div class="main">
                    <h1>Main page header</h1>
                </div>
                <form onSubmit={this.handleSetMonthlyInput}>
                    <label>Set Monthly Income</label>
                    <input onChange={this.handleChange} type="number" id="incomeValue" />
                    <button type="submit">Set</button>
                </form>
                <p>Current Income : {this.props.userData.monthlyIncome ? (this.props.userData.monthlyIncome) : (0)}</p>
                <button>Add Income</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(MainHeader)