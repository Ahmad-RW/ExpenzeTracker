import React, { Component } from 'react'
import { connect } from 'react-redux'


class CatagoryHeader extends Component {
    


    listUserCatagory = () => {
        const catagoryList = this.props.userData.catagory ? (this.props.userData.catagory.map(cat => {
            return <li><b>{cat.name}</b>. precentage : {cat.share}% balance :{cat.balance}</li>
        })) : (<p>Loading....</p>)
        return catagoryList
    }


    render() {
        return (
            <ul>
                {this.listUserCatagory()}
            </ul>
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
       
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CatagoryHeader)