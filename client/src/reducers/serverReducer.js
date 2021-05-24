const serverInfoReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_SERV_INFO':
            return action.payload
        case 'LOGOUT':
            return null
        default :
            return state
    }
}

export default serverInfoReducer