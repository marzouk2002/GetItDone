import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import infoReducer from './infoReducer'
import serverReducer from './serverReducer'

const allReducers = combineReducers({
    login: loginReducer,
    userInfo: infoReducer,
    serverInfo: serverReducer
})

export default allReducers