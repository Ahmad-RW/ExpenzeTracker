import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/categorylist.css'
import { Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

class CategoryList extends Component {



    listUserCategory = () => {
        const categoryList = this.props.userData.category ? (this.props.userData.category.map(cat => {
            return <Segment class="cat"><b><Link to={{pathname:`/category/${cat._id}`, state:{category:cat} }}>{cat.name}</Link></b> <div>{cat.share}%</div> {cat.balance}</Segment>
        })) : (<p>Loading....</p>)
        return categoryList
    }


    render() {
        return (
            <div class="cat-container">
                {this.listUserCategory()}
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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)