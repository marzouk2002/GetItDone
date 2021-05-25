import React from 'react'
import { Redirect } from 'react-router'
// components
import SideMenu from './layout/SideMenu'
import ProjectsMenu from './layout/ProjectsMenu'
// redux
import { useSelector } from 'react-redux'
// style 
import '../dashboard.css'


function Dashboard() {

    const login = useSelector(state => state.login)

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