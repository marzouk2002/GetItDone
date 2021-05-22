import React from 'react'
//redux
import { useSelector } from 'react-redux'

function Server() {

    const userInfo = useSelector(state => state.userInfo)

    return (
        <main>
            <header className="major" style={{marginLeft: '10%'}}>
                    <h1>Server</h1>
            </header>
            <section className="inner" style= {inner_style}>
                <h3>Server Id: <h3>{userInfo.serverId}</h3></h3>
            </section>
        </main>
    )
}

const inner_style = {padding: "1rem 0"}

export default Server
