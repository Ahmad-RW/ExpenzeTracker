import React, { Component } from 'react'
import '../style/mainheader.css'
import add from '../img/add.png'
import { connect } from 'react-redux'
import { setMonthlyIncome } from '../store/actions'
import AddIncome from './AddIncome';
import SetMonthlyIncome from './SetMonthlyIncome';

class MainHeader extends Component {

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
                        <span>{this.props.userData.monthlyIncome.amount ? (this.props.userData.monthlyIncome.amount) : ("Loading...")}</span>
                    </div>
                    <img class="add" src={add} alt="add" />
                </div>
                <div class="set-income">
                    <SetMonthlyIncome />
                    <AddIncome />
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