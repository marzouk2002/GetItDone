
const userInfoReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_USER_INFO':
            return action.payload
        case 'LOGOUT':
            return {}
        default :
            return state
    }
}

export default userInfoReducer