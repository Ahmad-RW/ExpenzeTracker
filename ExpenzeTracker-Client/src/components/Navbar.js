import React, { Component } from "react";
import "../style/navbar.css";
import home from "../img/home.png";
import categories from "../img/categories.png";
import settings from "../img/settings.png";
import avatar from "../img/avatar.png";
import { Modal, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CategoryForm from "./CategoryForm";
import { Link } from "react-router-dom";
import urls from "../router/urls";

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav class="navbar">
          <div class="nav-left">
            <Link to={{ pathname: urls.home  }}>
              {/* <img class="home" src={home} alt="home" /> */}
              <Icon name="home" />
            </Link>
            <Modal
            // <img class="categories" src={categories} alt="categories" />
              trigger={<Icon name="th" />}
              centered={false}
              size="tiny"
            >
              <div> <CategoryForm /> </div>
            </Modal>
            <Link to={{ pathname: `/settings` }}>
              {/* <img class="settings" src={settings} alt="settings" /> */}
              <Icon name="cog" class="settings" />
            </Link>
          </div>
          

          <div class="nav-center"> <h1 id="title">Expenze</h1> </div>

          <div class="nav-right">
            {/* <img class="avatar" src={avatar} alt="avatar" /> */}
            <Icon name="user" />
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
