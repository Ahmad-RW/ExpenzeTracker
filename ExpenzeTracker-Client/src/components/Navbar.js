import React, { Component } from 'react'
import '../style/navbar.css'

class Navbar extends Component {  
    render() {
        return (
            <React.Fragment>
                <nav class="navbar">

                    <div class="nav-left">
                        <a class="home" src="/" alt="Home"></a>
                    </div>

                    <div class="nav-center">
                    <h1>Expenze</h1>
                    </div>

                    <div class="nav-right profile">
                        <ul>
                            <li>Welcome, Rakan Salem</li>
                            <li><a class="avatar" src="/" alt="Avatar"></a></li>
                        </ul>
                    </div> 
                </nav>
            </React.Fragment>
        )
    }
}



export default Navbar