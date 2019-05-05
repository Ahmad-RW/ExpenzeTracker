import axios from 'axios'


export const getUserData = payload =>{
    return dispatch =>{
        console.log("fetching....")
        axios.get(`http://localhost:5000/getUserData?email=${payload.email}`).then(res=>{
            dispatch({type:"SET_USER_DATA", res})
        }).catch(err=>{
            console.log(err)
        })
    }
}
export const createCatagory = (payload) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/newCatagory', { payload:payload }).then((res) => {
            dispatch({ type: "CREATE_CATAGORY", res })
        }).catch((err) => {
            console.log(err)
        })
    }
}