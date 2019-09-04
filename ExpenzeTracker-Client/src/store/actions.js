import axios from 'axios'
import {getFeedbackMessage } from '../components/helpers';

export const getUserData = payload => {
    return dispatch => {
        axios.get(`/getUserData?email=${payload.email}`).then(res => {
            dispatch({ type: "SET_USER_DATA", res })
        }).catch(err => {
            console.log(err)
        })
    }
}

export const createCategory = (payload) => {
    return (dispatch) => {
        axios.post('/newCategory', { payload: payload }).then((res) => {
            dispatch({ type: "UPDATE_STORE", res })
            getFeedbackMessage(null, "category created", "category created", "success")
        }).catch((err) => {
            console.log(err)
        })
    }
}

export const setMonthlyIncome = payload => {
    return dispatch => {
        axios.post('/setUserIncome', { payload: payload }).then(res => {
            dispatch({ type: "UPDATE_STORE", res })
        }).catch(err => {
            console.log(err)
        })
    }
}

export const addIncome = (payload, component) => {
    return dispatch =>{
        axios.post('/addIncome', {payload}).then(res=>{
            dispatch({ type: "UPDATE_STORE", res })
            getFeedbackMessage(component, "Transaction completed", "income added", "success");//this will set state to feedbackMessage : true which will render the actual message to the view.
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const editCategories = (payload, component) =>{
    return dispatch =>{
        axios.post('/editCategories', {payload}).then(res=>{
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
        axios.post("/deleteCategory", {payload}).then(res=>{
            dispatch({type:"DELETE_CATEGORY", res})
            getFeedbackMessage(component, "Category deleted", "category deleted successfully", "success")
            
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const submitExpense = (payload, component) =>{
    return dispatch =>{
        axios.post("/submitExpense", {payload}).then(res=>{
            dispatch({type:"UPDATE_STORE", res})
            getFeedbackMessage(component, "Expense registered", "expense registered successfully", "success")
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const handleRename = (payload, component) =>{
    return dispatch =>{
        axios.post("/handleRename", {payload}).then(res=>{
            dispatch({type:"UPDATE_STORE", res})
            getFeedbackMessage(component, "Category Renamed", "Category Renamed", "success")
        }).catch(err=>{
            console.log(err)
        })
    }
}
export const transfer = (payload, component)=>{
    return dispatch =>{
        axios.post("/handleTransfer", {payload}).then(res=>{
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