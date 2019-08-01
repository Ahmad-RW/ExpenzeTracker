

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
        if(state.context!==null){
            action.res.data.category.forEach(elem=>{
                if(elem._id === state.context._id)
                state= {
                     userData: action.res.data,
                     context : {...elem}
                }
            })
            return state
        }
        return state={
            userData : action.res.data
        }
        case "UPDATE_STORE":
        console.log(state, action)
        if(state.context!==null){
            action.res.data.category.forEach(elem=>{
                if(elem._id === state.context._id)
                state= {
                     userData: action.res.data,
                     context : {...elem}
                }
            })
            return state
        }
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