import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/categorylist.css'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { deleteCategory } from '../store/actions'
class CategoryList extends Component {


    state = {
        renderSuccessMessage: false
    }
    listUserCategory = () => {
        const categoryList = this.props.userData.category ? (this.props.userData.category.map(cat => {
            return (<Segment class="cat">
                <b><Link to={{ pathname: `/category/${cat._id}`, state: { category: cat } }}>{cat.name}</Link>  <a onClick={() => { this.handleDelete(cat) }}>Delete </a>   </b>
                <div>{cat.share}%</div> {cat.balance}

            </Segment>
            )
        })) : (<p>Loading....</p>)
        return categoryList
    }

    handleDelete = category => {
        const payload = {
            userData: this.props.userData,
            category
        }
        this.props.deleteCategory(payload, this)
    }
    renderSuccessMessage = () => {
        if (this.state.renderSuccessMessage) {
            return <h3>POOF</h3>
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.renderSuccessMessage()}
                <div class="cat-container">
                    {this.listUserCategory()}
                </div>
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
        deleteCategory: (category, component) => { dispatch(deleteCategory(category, component)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)