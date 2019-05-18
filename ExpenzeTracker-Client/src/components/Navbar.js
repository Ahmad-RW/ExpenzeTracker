import React, { Component } from 'react'
import '../style/navbar.css'

class Navbar extends Component {  
    render() {
        return (
            <React.Fragment>
                <nav class="navbar">

                    <div class="nav-left">
                        <svg class="home"></svg>
                        <svg class="categories"></svg>
                        <svg class="settings"></svg>
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