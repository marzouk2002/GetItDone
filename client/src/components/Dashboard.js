import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
// components
import toExport from './layout/dashboard/index'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { setServerInfo as setServerStore } from '../actions'
// style 
import '../dashboard.css'

const { SideMenu, ProjectsMenu, Texting, Main } = toExport

function Dashboard() {
    const dispatch = useDispatch()
    const login = useSelector(state => state.login)

    const [ serverInfo, setServerInfo ] = useState(useSelector(state => state.serverInfo))

    const token = localStorage.getItem('token')
    
    useEffect(()=> {
        if(!serverInfo) {
            fetch('http://localhost:5000/app/serverinfo', {
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
                <Main/>
            </div>
            <Texting/>
        </div>
    )
}

export default Dashboard