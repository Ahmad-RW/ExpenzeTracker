import React, { Component } from 'react'
import { getCategory } from './helpers'
import { connect } from 'react-redux'

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
                <div>
                    action :  {log.action} ,, amount : {log.amount},, category : {log.category_id === null ? (<span>all categories</span>) : (getCategory(log.category_id, this.props.userData.category).name)}
                </div>
            )
        })
    }

    listLogsForCategory = (category_id) => {
        return this.props.logs.map(log => {
            console.log(log)
            if (category_id === log.category_id || category_id === log.to || category_id === log.from) {
                return (<div>
                    action : {log.action},,,,, amount : {log.amount}
                </div>)
            }
        })
    }

    render() {
        return (
            <React.Fragment>
            {this.listLogs()}
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




