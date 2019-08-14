import React, { Component } from "react";
import "../style/navbar.css";
import { Modal, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CategoryForm from "./CategoryForm";
import { Link } from "react-router-dom";
import urls from "../router/urls";
import { connect } from "react-redux";

class Navbar extends Component {
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
            <a href="#" onClick={this.props.logout}>
              Log out
            </a>
          </div>
          

          <div class="nav-center"> <h1 id="title">Expenze</h1> </div>

          <div class="nav-right">
            <span>{this.props.userData.name}</span>
            <Icon name="user" />
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
