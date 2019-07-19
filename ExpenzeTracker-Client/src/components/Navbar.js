import React, { Component } from 'react'
import '../style/navbar.css'
import home from '../img/home.png'
import categories from '../img/categories.png'
import settings from '../img/settings.png'
import avatar from '../img/avatar.png'
import { Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import CategoryForm from './CategoryForm';
import { Link } from "react-router-dom";


class Navbar extends Component {
    render() {
        return (
          <React.Fragment>
            <nav class="navbar">
              <div class="nav-left">
                <Link to={{ pathname: `/` }}>
                  <img class="home" src={home} alt="home" />
                </Link>
                <Modal
                  trigger={
                    <img
                      class="categories"
                      src={categories}
                      alt="categories"
                    />
                  }
                  centered={false}
                >
                    <div>
                      <CategoryForm />
                    </div>
                </Modal>
                <Link to={{ pathname: `/settings` }}>
                  <img class="settings" src={settings} alt="settings" />
                </Link>
              </div>

              <div class="nav-center">{/* <h1>Expenze</h1> */}</div>

              <div class="nav-right profile">
                <span class="welcome">Welcome, John Doe</span>
                <img class="avatar" src={avatar} alt="avatar" />
              </div>
            </nav>
          </React.Fragment>
        );
    }
}



export default Navbar