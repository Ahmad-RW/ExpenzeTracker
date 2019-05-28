import axios from 'axios'
import { triggerSuccessMessage } from '../components/helpers';


export const getUserData = payload => {
    return dispatch => {
        console.log("fetching....")
        axios.get(`http://localhost:5000/getUserData?email=${payload.email}`).then(res => {
            dispatch({ type: "SET_USER_DATA", res })
        }).catch(err => {
            console.log(err)
        })
    }
}
export const createCatagory = (payload) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/newCatagory', { payload: payload }).then((res) => {
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
        console.log(payload)
        axios.post('http://localhost:5000/addIncome', {payload}).then(res=>{
            dispatch({ type: "UPDATE_STORE", res })
            triggerSuccessMessage(component);//this will set state to feedbackMessage : true which will render the actual message to the view.
        }).catch(err=>{
            console.log(err)
        })
    }
    
}