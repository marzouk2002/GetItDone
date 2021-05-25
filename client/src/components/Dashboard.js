import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
// components
import SideMenu from './layout/SideMenu'
import ProjectsMenu from './layout/ProjectsMenu'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { setServerInfo as setServerStore } from '../actions'
// style 
import '../dashboard.css'


function Dashboard() {
    const dispatch = useDispatch()
    const login = useSelector(state => state.login)

    const [ serverInfo, setServerInfo ] = useState(useSelector(state => state.serverInfo))

    const token = localStorage.getItem('token')
    
    useEffect(()=> {
        if(!serverInfo) {
            fetch('http://localhost:5000/users/serverinfo', {
                headers : { Authorization: token }
            })
            .then(res => res.json())
            .then(data => {
                setServerInfo(data.serverInfo)
                dispatch(setServerStore(data.serverInfo))
            })
        }
    }, [ token, dispatch, serverInfo ])

    return (
        <div className="dashbord-container">
            { !login && <Redirect to={{pathname: "/login", state: {msgs:[{text: 'Sorry you should logged in to access that page',type:"danger" }]}}} /> }
            <SideMenu/>
            <div className="main">
                <ProjectsMenu/>
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}

export default Dashboard