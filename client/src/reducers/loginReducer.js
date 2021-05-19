
const loginReducer = (state= false, action) => {
    switch(action.type) {
        case 'USER_LOGGED':
            return true
        case 'LOGOUT':
            return false
        default :
            return state
    }
}

export default loginReducer