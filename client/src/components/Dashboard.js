import React from 'react'
import { Redirect } from 'react-router'
// components
import SideMenu from './layout/SideMenu'
// redux
import { useSelector } from 'react-redux'
// style 
import '../dashboard.css'
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {

    const login = useSelector(state => state.login)

    const proMenuToggle = () => {
        document.querySelector('.control').classList.toggle('open')
    }

    return (
        <div className="dashbord-container">
            { !login && <Redirect to={{pathname: "/login", state: {msgs:[{text: 'Sorry you should logged in to access that page',type:"danger" }]}}} /> }
            <SideMenu/>
            <div className="main">
                <div className="projects-band">
                    <div className="control">
                        <div className="btn" onClick={proMenuToggle}>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </div>
                        <h4>projects</h4>
                    </div>
                    <div className="pro-container"></div>
                </div>
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}

export default Dashboard