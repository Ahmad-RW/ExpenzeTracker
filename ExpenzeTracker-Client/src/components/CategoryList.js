import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/categorylist.css'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
class CategoryList extends Component {


    state = {
        renderSuccessMessage: false
    }
    listUserCategory = () => {
        const categoryList = this.props.userData.category ? (this.props.userData.category.map(cat => {
            return (<div class="cat">
                <div class="cat-color">
                    
                </div>
                <b><Link to={{ pathname: `/category/${cat._id}`, state: { category: cat } }}>{cat.name}</Link>     </b>
                <div>{cat.share}%</div> {cat.balance}

            </div>
            )
        })) : (<p>Loading....</p>)
        return categoryList
    }

   
    renderSuccessMessage = () => {
        if (this.state.renderSuccessMessage) {
            return <h3>POOF</h3>
        }
    }
    render() {
        return (
          <React.Fragment>
            <div class="cat-container">
              {this.renderSuccessMessage()}
              {this.listUserCategory()}
            </div>
          </React.Fragment>
        );
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