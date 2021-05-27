import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
// components
import toExport from './layout/dashboard/index'
// redux
import { useSelector } from 'react-redux'
// style 
import '../dashboard.css'

const { SideMenu, ProjectsMenu, Texting, Main } = toExport

function Dashboard() {
    // store
    const login = useSelector(state => state.login)
    //state
    const [ projects, setProjects ] = useState(null)
    const [ selectedIndex, setIndex ] = useState(0)

    const token = localStorage.getItem('token')
    
    useEffect(()=> {
            fetch('http://localhost:5000/app/projects', {
                headers : { Authorization: token }
            })
            .then(res => res.json())
            .then(data => {
                setProjects(data.projects)
            })
    }, [ token ])

    // useEffect(()=> {
    //     fetch('http://localhost:5000/app/projects', {
    //         headers : { Authorization: token }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         setProjects(data.projects)
    //     })
    // }, [ token ])

    return (
        <div className="dashbord-container">
            { !login && <Redirect to={{pathname: "/login", state: {msgs:[{text: 'Sorry you should logged in to access that page',type:"danger" }]}}} /> }
            <SideMenu/>
            <div className="main">
                <ProjectsMenu projects={projects} setIndex={setIndex}/>
                <Main/>
            </div>
            <Texting/>
        </div>
    )
}

export default Dashboard