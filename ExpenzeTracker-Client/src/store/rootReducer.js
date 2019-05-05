

const initState = {
    userData : {}
}

const rootReducer = (state = initState, action) =>{
    switch(action.type){
        case "CREATE_CATAGORY":
        //modify state in an immutable way then return it.
        console.log(state, action)


        default:
        return state
    }
}


export default rootReducer