import { stat } from "fs";


const initState = {
    userData: {
        name: "",
        monthlyIncome: {
            payrollDate: "",
            amount: ""
        },
        email: "",
        category: []
    },
    context: null,
    logs: [{
        action: "",
        category_id: "",
        amount: "",
        timestamp: ""
    }]
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {

        case "SET_USER_DATA":
            console.log(state)
            if (state.context === null) {
                
                return state = {
                    userData: action.res.data,
                    context : null,
                    logs: action.res.data.logs,
                }
            }
            else {//dont lose the context.
                action.res.data.category.forEach(elem => {
                    if (elem._id === state.context._id) {
                        state = {
                            userData: action.res.data,
                            logs: action.res.data.logs,
                            context: { ...elem }
                        }
                    }
                })
           
                return state
            }
        case "UPDATE_STORE":
            console.log(state)
            if (state.context === null) {
                return state = {
                    userData: action.res.data,
                    context : null,
                    logs: action.res.data.logs,
                }
            }
            else{//this is to handel update to the caterogry that is the context.
                console.log(state.context)
                action.res.data.category.forEach(elem => {
                    if (elem._id === state.context._id) {
                        state = {
                            userData: action.res.data,
                            logs: action.res.data.logs,
                            context: { ...elem }
                        }
                    }
                })
                return state
            }
        case "DELETE_CATEGORY":
             state = {
                userData: action.res.data,
                logs: action.res.data.logs,
                context: null
            }
            console.log(state)
            return state
        case "SET_CONTEXT":
            console.log(state, action)
            state = {
                ...state,
                context: action.context
            }
            console.log(state)
            return state
        default:
            return state
    }
}


export default rootReducer