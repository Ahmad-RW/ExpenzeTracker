

const initState = {
    userData : {}
}

const rootReducer = (state = initState, action) =>{
    switch(action.type){

        case "SET_USER_DATA": 
        console.log(action)
        return state = {
            userData : action.res.data
        }
        case "CREATE_CATAGORY":
        //modify state in an immutable way then return it.
        console.log(state, action)
        return state={
            userData : action.res.data
        }

        


        default:
        return state
    }
}


export default rootReducer