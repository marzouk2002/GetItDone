import React, { useEffect, useState } from 'react'
//redux
import { useSelector } from 'react-redux'

function Server() {
    const [ developers, setDevelopers ] = useState(null)
    const [ managers, setManagers ] = useState(null)
    const [ requests, setRequests ] = useState(null)

    const userInfo = useSelector(state => state.userInfo)

    useEffect(()=> {
        const token = localStorage.getItem('token')
        fetch('http://localhost:5000/users/serverinfo', {
            headers : { Authorization: token }
        })
        .then(res => res.json())
        .then(data => {
            const { developers, managers, requests } = data.serverInfo
            setDevelopers(developers)
            setManagers(managers)
            setRequests(requests)
        })
    })

    return (
        <main>
            <header className="major" style={{marginLeft: '10%'}}>
                    <h1>Server</h1>
            </header>
            <section className="inner" style= {inner_style}>
                <div>
                    <h3 style={{marginBottom:'0', lineHeight: 'normal'}}>Server Id: </h3>
                    <h2 style={{marginLeft:'4rem'}}>{userInfo.serverId}</h2>
                </div>
                <div>
                    <h3>Admin</h3>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userInfo.name}</td>
                                    <td>{userInfo.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                { managers && <div>
                    <h3>Managers</h3>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                               { managers.map(man => {
                                    return (<tr key={man.id}>
                                        <td>{man.name}</td>
                                        <td>{man.email}</td>
                                        <td>{man.role}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>}
            </section>
        </main>
    )
}

const inner_style = {padding: "1rem 0"}

export default Server
