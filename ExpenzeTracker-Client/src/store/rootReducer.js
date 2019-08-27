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
    }],
    auth: false
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {

        case "AUTH_USER":
            state = {
                userData: action.payload.userData,
                logs: action.payload.userData.logs,
                auth: true,
                context: null
            }
            return state
        case "LOGOUT":
            state = {...initState}
            return state
        case "SET_USER_DATA":
            if (state.context === null) {

                return state = {
                    userData: action.res.data,
                    context: null,
                    logs: action.res.data.logs,
                    auth: true
                }
            }
            else {//dont lose the context.
                action.res.data.category.forEach(elem => {
                    if (elem._id === state.context._id) {
                        state = {
                            userData: action.res.data,
                            logs: action.res.data.logs,
                            context: { ...elem },
                            auth: true

                        }
                    }
                })

                return state
            }
        case "UPDATE_STORE":
            if (state.context === null) {
                return state = {
                    ...state,//this is to maintain auth status
                    userData: action.res.data,
                    context: null,
                    logs: action.res.data.logs,
                }
            }
            else {//this is to handel update to the caterogry that is the context.
                action.res.data.category.forEach(elem => {
                    if (elem._id === state.context._id) {
                        state = {
                            ...state,//this is to maintain auth status
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
                ...state,//maintain auth status
                userData: action.res.data,
                logs: action.res.data.logs,
                context: null
            }
            return state
        case "SET_CONTEXT":
            state = {
                ...state,
                context: action.context
            }
            return state
        
        default:
            return state
    }
}


export default rootReducer