import React, { Component } from 'react'
import CategoryHeader from './CategoryHeader'
import { connect } from 'react-redux'
import Logs from './Logs';
import { Modal } from 'semantic-ui-react'
import '../style/categorypage.css';
import Navbar from './Navbar';

class Category extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
        console.log(this.props.logs)
        if (this.props.context === null) {
            this.props.history.push("/NotFound")
        }


    }
 
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Modal.Header><CategoryHeader categoryName={this.props.context.name} /></Modal.Header>
                <Modal.Content>
                <Logs category_id={this.props.context._id} />
                </Modal.Content>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData,
        context: state.context,
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);

