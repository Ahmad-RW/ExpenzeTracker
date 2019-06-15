import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Segment, Dimmer, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class CategoryList extends Component {



    listUserCategory = () => {
        const categoryList = this.props.userData.category.length ? (this.props.userData.category.map(cat => {
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
        return categoryList
    }


    render() {
        return (
            <ul>
                {this.listUserCategory()}
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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)