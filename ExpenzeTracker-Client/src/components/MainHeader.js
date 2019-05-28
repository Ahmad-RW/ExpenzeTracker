import React, { Component } from 'react'
import '../style/mainheader.css'
import add from '../img/add.png'
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
                    <div class="main-balance">
                        <span>Balance: </span>
                        <span class="">1500</span>
                    </div>
                    <div class="monthly-income">
                        <span>Monthly Income: </span>
                        <span>1100</span>
                    </div>
                    <img class="add" src={add} alt="add" />
                </div>
                <div class="set-income">
                    <form onSubmit={this.handleSetMonthlyInput}>
                        <label>Set Monthly Income</label>
                        <input onChange={this.handleChange} type="number" id="incomeValue" />
                        <button type="submit">Set</button>
                    </form>
                    <p>Current Income : {this.props.userData.monthlyIncome ? (this.props.userData.monthlyIncome) : (0)}</p>
                    <button>Add Income</button>
                </div>
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