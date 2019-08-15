import React, { Component } from 'react'
import { getCategory } from './helpers'
import { connect } from 'react-redux'
import '../style/logs.css'
import { Icon } from 'semantic-ui-react';

class Logs extends Component {
    state = {
        category_id: this.props.category_id
    }
    listLogs = () => {
        console.log(typeof this.props.category_id === 'undefined')
        if (typeof this.props.category_id === 'undefined') {
            console.log("hellp")
            return this.listAllLogs()
        }
        else {
            return this.listLogsForCategory(this.props.category_id)
        }
    }


    listAllLogs = () => {
        return this.props.logs.map(log => {
            return (
                <div class="log">
                    {this.logAction(log.action)} <span class="log-amount">{log.amount}</span> <span class="time">12:45 - 27/7/2077</span><span class="log-category">{log.category_id === null ? (<span>all categories</span>) : (getCategory(log.category_id, this.props.userData.category).name)}</span>
                </div>
            )
        })
    }

    listLogsForCategory = (category_id) => {
        return this.props.logs.map(log => {
            console.log(log)
            if (category_id === log.category_id || category_id === log.to || category_id === log.from) {
                return (
                <div class="log">
                    <span class="action-icon">{this.logAction(log.action)}</span><span class="log-amount">{log.amount}</span><span class="time">12:45 27/7/2077</span><span class="log-category"></span>
                </div>
                )
            }
        })
    }

    logAction = (action) => {
        switch (action) {
            case "INCOME":
                return <span class="action-icon"><Icon name="arrow up" color="green"/></span>
            case "EXPENSE":
                return <span class="action-icon"><Icon name="arrow down" color="red"/></span>
            case "TRANSFER":
                return <span class="action-icon"><Icon name="arrow right" color="yellow"/></span>
        }
    }

    render() {
        return (
            <React.Fragment>
                <div class="logs-container">
                    <div class="logs">
                        {this.listLogs()}
                    </div>
                </div>
            </React.Fragment>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(Logs);




