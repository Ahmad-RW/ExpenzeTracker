import axios from 'axios'


export const getUserData = payload =>{
    return dispatch =>{
        axios.get(`http://localhost:5000/getUserData?email=${payload.email}`).then(res=>{
            dispatch({type:"SET_USER_DATA", payload:res.data})
        }).catch(err=>{
            console.log(err)
        })
    }
}
export const createCatagory = (payload) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/newCatagory', { payload:payload }).then((res) => {
            dispatch({ type: "CREATE_CATAGORY", payload: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }
}