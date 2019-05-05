import React, { Component } from 'react'
import {connect} from 'react-redux'

class CatagoryHeader extends Component {


    listUserCatagory = () =>{
        // const catagoryList = this.props.userData.catagory.map(cat=>{
        //     return <h1>{cat.name}</h1>
        // })
        return (<h1>{this.props.userData.catagory.length}</h1>)
    }
    render() {
        console.log(this.props.userData)
        return (
            <div>
                {this.listUserCatagory()}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}
export default connect(mapStateToProps)(CatagoryHeader)