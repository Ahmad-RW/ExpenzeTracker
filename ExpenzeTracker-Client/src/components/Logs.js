import React, { Component } from 'react'
import { getCategory } from './helpers'
import { connect } from 'react-redux'
import '../style/logs.css'
import { Icon } from 'semantic-ui-react';
import moment from 'moment'
class Logs extends Component {
    state = {
        category_id: this.props.category_id
    }
    listLogs = () => {
        if (typeof this.props.category_id === 'undefined') {
            return this.listAllLogs()
        }
        else {
            return this.listLogsForCategory(this.props.category_id)
        }
    }
    getDateFromTimeStamp = (timeStamp) =>{
        
        let milliseconds = Date.parse(timeStamp)
        
        return moment(milliseconds).format("DD-MMMM-YYYY")
     
      }

    listAllLogs = () => {
        return this.props.logs.map(log => {
            if (log.action === "TRANSFER") {
                return (
                    <div class="log">
                        {this.logAction(log.action)} <span class="log-amount">{log.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> <span class="time">{this.getDateFromTimeStamp(log.timeStamp)}</span><span class="log-category">from {(getCategory(log.from, this.props.userData.category)).name} to {(getCategory(log.to, this.props.userData.category)).name}</span>
                    </div>
                )
            }
            return (
                <div class="log">
                    {this.logAction(log.action)} <span class="log-amount">{log.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> <span class="time">{this.getDateFromTimeStamp(log.timeStamp)}</span><span class="log-category">{log.category_id === null ? (<span>all categories</span>) : (getCategory(log.category_id, this.props.userData.category).name)}</span>
                </div>
            )
        })
    }

    listLogsForCategory = (category_id) => {
        return this.props.logs.map(log => {
            if (category_id === log.category_id || category_id === log.to || category_id === log.from) {
                if (category_id === log.to) {
                    return (
                        <div class="log">
                            <span class="action-icon">{this.logAction(log.action)} from {(getCategory(log.from, this.props.userData.category)).name}</span><span class="log-amount">{log.amount}</span><span class="time">{this.getDateFromTimeStamp(log.timeStamp)}</span><span class="log-category"></span>
                        </div>
                    )
                }
                if(category_id === log.from){
                    return(
                        <div class="log">
                    <span class="action-icon"> {this.logAction(log.action)}   to {(getCategory(log.to, this.props.userData.category)).name} </span><span class="log-amount">{log.amount}</span><span class="time">{this.getDateFromTimeStamp(log.timeStamp)}</span><span class="log-category"></span>
                </div>
                    )
                }
                return (
                    <div class="log">
                        <span class="action-icon">{this.logAction(log.action)}</span><span class="log-amount">{log.amount}</span><span class="time">{this.getDateFromTimeStamp(log.timeStamp)}</span><span class="log-category"></span>
                    </div>
                )
            }
        })
    }

    logAction = (action) => {
        switch (action) {
            case "INCOME":
                return <span class="action-icon"><Icon name="arrow up" color="green" /></span>
            case "EXPENSE":
                return <span class="action-icon"><Icon name="arrow down" color="red" /></span>
            case "TRANSFER":

                return <span class="action-icon"><Icon name="arrow right" color="yellow" /></span>
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




