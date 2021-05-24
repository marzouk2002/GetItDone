
export const isLogged = (bool) => {
    if(bool) {
        return {type:'USER_LOGGED'}
    } 
    else {
        return  {type:'LOGOUT'}
    }
}

export const setUserInfo = (data) => {
    if(data) {
        return {
        type: 'SET_INFO',
        payload: data
        }
    } 
    else {
        return  {type:'LOGOUT'}
    }
}

export const setServerInfo = (data) => {
    if(data) {
        return {
        type: 'SET_INFO',
        payload: data
        }
    } 
    else {
        return  {type:'LOGOUT'}
    }
}