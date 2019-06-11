import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Segment, Dimmer, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class CatagoryHeader extends Component {



    listUserCatagory = () => {
        const catagoryList = this.props.userData.catagory.length ? (this.props.userData.catagory.map(cat => {
            return <li><b>{cat.name}</b>. precentage : {cat.share}% balance :{cat.balance}</li>
        })) : (
                <Segment>
                    <Dimmer active>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>

                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Segment>
            )
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