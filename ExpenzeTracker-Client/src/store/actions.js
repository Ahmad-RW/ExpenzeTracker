import axios from 'axios'
import {getFeedbackMessage } from '../components/helpers';

export const getUserData = payload => {
    return dispatch => {
        axios.get(`http://localhost:5000/getUserData?email=${payload.email}`).then(res => {
            dispatch({ type: "SET_USER_DATA", res })
        }).catch(err => {
            console.log(err)
        })
    }
}

export const createCategory = (payload) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/newCategory', { payload: payload }).then((res) => {
            dispatch({ type: "UPDATE_STORE", res })
        }).catch((err) => {
            console.log(err)
        })
    }
}

export const setMonthlyIncome = payload => {
    return dispatch => {
        axios.post('http://localhost:5000/setUserIncome', { payload: payload }).then(res => {
            dispatch({ type: "UPDATE_STORE", res })
        }).catch(err => {
            console.log(err)
        })
    }
}

export const addIncome = (payload, component) => {
    return dispatch =>{
        axios.post('http://localhost:5000/addIncome', {payload}).then(res=>{
            dispatch({ type: "UPDATE_STORE", res })
            getFeedbackMessage(component, "Transaction completed", "income added", "success");//this will set state to feedbackMessage : true which will render the actual message to the view.
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const editCategories = (payload, component) =>{
    return dispatch =>{
        axios.post('http://localhost:5000/editCategories', {payload}).then(res=>{
            dispatch({type:"UPDATE_STORE", res})
            getFeedbackMessage(component, "Changes saved", "changes were saved successfully", "success")
        }).catch(err=>{
            getFeedbackMessage(component, "Error", "an error occured please try again later", "error")
            console.log(err)
        })
    }
}

export const deleteCategory = (payload, component) =>{
    return dispatch=>{
        axios.post("http://localhost:5000/deleteCategory", {payload}).then(res=>{
            dispatch({type:"DELETE_CATEGORY", res})
            getFeedbackMessage(component, "Category deleted", "category deleted successfully", "success")
            
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const submitExpense = (payload, component) =>{
    return dispatch =>{
        axios.post("http://localhost:5000/submitExpense", {payload}).then(res=>{
            dispatch({type:"UPDATE_STORE", res})
            getFeedbackMessage(component, "Expense registered", "expense registered successfully", "success")
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const handleRename = (payload, component) =>{
    return dispatch =>{
        axios.post("http://localhost:5000/handleRename", {payload}).then(res=>{
            dispatch({type:"UPDATE_STORE", res})
            getFeedbackMessage(component, "Category Renamed", "Category Renamed", "success")
        }).catch(err=>{
            console.log(err)
        })
    }
}
export const transfer = (payload, component)=>{
    return dispatch =>{
        axios.post("http://localhost:5000/handleTransfer", {payload}).then(res=>{
            dispatch({type:"UPDATE_STORE", res})
            getFeedbackMessage(component, "Operation successful", "amount transferred successfully", "success")
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const setContext = context =>{
    return dispatch =>{
        dispatch({type:"SET_CONTEXT", context})
    }
}