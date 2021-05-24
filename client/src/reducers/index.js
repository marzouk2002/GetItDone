import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import userInfoReducer from './infoReducer'
import serverInfoReducer from './serverReducer'

const allReducers = combineReducers({
    login: loginReducer,
    userInfo: userInfoReducer,
    serverInfo: serverInfoReducer
})

export default allReducers