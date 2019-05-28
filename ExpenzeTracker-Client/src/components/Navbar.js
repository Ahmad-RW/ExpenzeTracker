import React, { Component } from 'react'
import '../style/navbar.css'
import home from '../img/home.png'
import categories from '../img/categories.png'
import settings from '../img/settings.png'

class Navbar extends Component {  
    render() {
        return (
            <React.Fragment>
                <nav class="navbar">

                    <div class="nav-left">
                        <img class="home"  src={home} alt="home"/>
                        <img class="categories"  src={categories} alt="categories"/>
                        <img class="settings"  src={settings} alt="settings"/>
                    </div>

                    <div class="nav-center">
                    <h1>Expenze</h1>
                    </div>

                    <div class="nav-right profile">
                        <span class="welcome">Welcome, Rakan Salem</span>
                        <svg class="avatar"></svg>
                    </div> 
                </nav>
            </React.Fragment>
        )
    }
}



export default Navbar