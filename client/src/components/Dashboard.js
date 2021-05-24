import React from 'react'
import { Redirect } from 'react-router'
// redux
import { useSelector } from 'react-redux'

function Dashboard() {

    const login = useSelector(state => state.login)

    return (
        <>
         { !login && <Redirect to={{pathname: "/login", state: {msgs:[{text: 'Sorry you should logged in to access that page',type:"danger" }]}}} /> }
        <div>
            <h1>Dashboard</h1>
        </div>
        </>
    )
}

export default Dashboard