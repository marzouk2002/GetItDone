const serverInfoReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_SERV_INFO':
            return action.payload
        case 'LOGOUT':
            return {}
        default :
            return state
    }
}

export default serverInfoReducer