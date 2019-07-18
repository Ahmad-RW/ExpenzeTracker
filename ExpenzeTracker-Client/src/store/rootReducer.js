

const initState = {
    userData : {
        name : "",
        monthlyIncome :{
            payrollDate : "",
            amount : ""
        },
        email : "",
        category: []
    },
    context : {}
}

const rootReducer = (state = initState, action) =>{
    switch(action.type){

        case "SET_USER_DATA": 
        console.log(action)
        return state = {
            userData : action.res.data
        }
        case "UPDATE_STORE":
        //modify state in an immutable way then return it.
        console.log(state, action)
        return state={
            userData : action.res.data
        }
        case "SET_CONTEXT":
            console.log(action)
            return state={
                ...state,
                context : action.context
            }
        default:
        return state
    }
}


export default rootReducer