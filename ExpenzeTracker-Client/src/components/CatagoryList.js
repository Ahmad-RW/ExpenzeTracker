import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/categorylist.css'
import { Segment } from 'semantic-ui-react'


class CatagoryHeader extends Component {



    listUserCatagory = () => {
        const catagoryList = this.props.userData.catagory ? (this.props.userData.catagory.map(cat => {
            return <Segment class="cat"><b>{cat.name}</b> <div>{cat.share}%</div> {cat.balance}</Segment>
        })) : (<p>Loading....</p>)
        return catagoryList
    }


    render() {
        return (
            <div class="cat-container">
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
const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CatagoryHeader)