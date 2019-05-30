import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import MainHeader from './MainHeader';
import CatagoryList from './CatagoryList'
import {createCatagory } from '../store/actions'
class Home extends Component {
    state = {
        catagoryName: ""
    }




    handleNameChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
    }
    createCatagory = e => {
        console.log(this.props)
        const payload = {
            catagoryName: this.state.catagoryName,
            userData: this.props.userData
        }
        this.props.createCatagory(payload)
    }
    renderCatagories = () => {
        return <h1>{this.props.userData.email}</h1>
    }
    listUserCatagory = () =>{
           const catagoryList = this.props.userData.catagory ? (this.props.userData.catagory.map(cat=>{
            return <li><b>{cat.name}</b>. precentage : {cat.share}% balance :{cat.balance}</li>
        })):(<p>Loading....</p>)
        return catagoryList
       
    }
    render() {

        return (
            <React.Fragment>
                <MainHeader />
                <h1>Home Page</h1>
                <label for="catagory-name">Create new catagory</label>
                <input type="text" placeholder="catagory name" id="catagoryName" onChange={this.handleNameChange} />
                <button onClick={this.createCatagory}>Create</button>
                <ul>{this.listUserCatagory()}</ul>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createCatagory: (payload) => { dispatch(createCatagory(payload)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)