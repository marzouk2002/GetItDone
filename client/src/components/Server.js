import React from 'react'
//redux
import { useSelector } from 'react-redux'

function Server() {

    const userInfo = useSelector(state => state.userInfo?.role)

    return (
        <main>
            <header className="major" style={{marginLeft: '10%'}}>
                    <h1>Profile</h1>
            </header>
        </main>
    )
}

export default Server
