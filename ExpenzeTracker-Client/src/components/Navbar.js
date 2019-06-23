import React, { Component } from 'react'
import '../style/navbar.css'
import home from '../img/home.png'
import categories from '../img/categories.png'
import settings from '../img/settings.png'
import avatar from '../img/avatar.png'
import { Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import CategoryForm from './CategoryForm';


class Navbar extends Component {
    render() {
        return (
          <React.Fragment>
            <nav class="navbar">
              <div class="nav-left">
                <img class="home" src={home} alt="home" />
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
                  <Modal.Header>Categories</Modal.Header>
                  <Modal.Content>
                    <div class="">
                      <CategoryForm />
                    </div>
                  </Modal.Content>
                </Modal>
                <img class="settings" src={settings} alt="settings" />
              </div>

              <div class="nav-center">
                <h1>Expenze</h1>
              </div>

              <div class="nav-right profile">
                <span class="welcome">Welcome, Rakan Salem</span>
                <img class="avatar" src={avatar} alt="avatar" />
              </div>
            </nav>
          </React.Fragment>
        );
    }
}



export default Navbar