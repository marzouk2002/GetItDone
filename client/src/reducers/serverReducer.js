const infoReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_INFO':
            return action.payload
        case 'LOGOUT':
            return null
        default :
            return state
    }
}

export default infoReducer