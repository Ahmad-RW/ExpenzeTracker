import React, { Component } from 'react'
import '../style/mainheader.css'
import add from '../img/add.png'
import { connect } from 'react-redux'
import { setMonthlyIncome } from '../store/actions'
import AddIncome from './AddIncome';
import SetMonthlyIncome from './SetMonthlyIncome';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

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
                        <span>{this.props.userData.monthlyIncome.amount ? (this.props.userData.monthlyIncome.amount) : ("Loading...")}</span>
                    </div>
                    <div>
                    <Modal trigger={<img class="add" src={add} alt="add" />} centered={false}>
                        <Modal.Header>Add</Modal.Header>
                        <Modal.Content>
                            <div class="set-income">
                                <SetMonthlyIncome />
                                <AddIncome />
                            </div>
                        </Modal.Content>
                    </Modal>
                    </div>
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