import React from 'react'
import { Redirect } from 'react-router'
// components
import Bands from './layout/Bands'
// redux
import { useSelector } from 'react-redux'

function Dashboard() {

    const login = useSelector(state => state.login)

    return (
        <div className="dashbord-container">
            { !login && <Redirect to={{pathname: "/login", state: {msgs:[{text: 'Sorry you should logged in to access that page',type:"danger" }]}}} /> }
            <Bands/>
            <div className="main">
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}

export default Dashboard