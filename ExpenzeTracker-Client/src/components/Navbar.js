import React, { Component } from "react";
import "../style/navbar.css";
import { Modal, Icon, Confirm } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CategoryForm from "./CategoryForm";
import { Link } from "react-router-dom";
import urls from "../router/urls";
import { connect } from "react-redux";

class Navbar extends Component {
  state = { open: false }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  
  render() {
    return (
      <React.Fragment>
        <nav class="navbar">
          <div class="nav-left">
            <Link to={{ pathname: urls.home  }}>
              <Icon name="home" />
            </Link>
            <Modal
              trigger={<Icon name="th" />}
              centered={false}
              size="tiny"
            >
              <div> <CategoryForm /> </div>
            </Modal>
            <Link to={{ pathname: `/settings` }}>
              <Icon name="cog" class="settings" />
            </Link>
          </div>
          

          <div class="nav-center"> <h1 id="title">Expenze</h1> </div>

          <div class="nav-right">
            {/* <span>{this.props.userData.name}</span> */}
            <Icon onClick={this.open} name="logout" size="large"/>
            <Confirm size="tiny" open={this.state.open} onCancel={this.close} onConfirm={this.props.logout} />
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    logout : () =>{dispatch({type:"LOGOUT"})}
  }
}
const mapStateToProps = state =>{
  return {
    userData : state.userData
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
