import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import infoReducer from './infoReducer'

const allReducers = combineReducers({
    login: loginReducer,
    userInfo: infoReducer
})

export default allReducers