import React, { useEffect, useState } from 'react'
//redux
import { useSelector } from 'react-redux'

function Server() {
    const [ developers, setDevelopers ] = useState([])
    const [ managers, setManagers ] = useState([])
    const [ requests, setRequests ] = useState([])
    const [ update, setUpdate ] = useState(0)

    const userInfo = useSelector(state => state.userInfo)
    const token = localStorage.getItem('token')
    
    useEffect(()=> {
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
    }, [ update, token ])

    const fire = (e) => {
        const id = e.target.value
        fetch('http://localhost:5000/users/fire', {
            method: 'DELETE',
            headers : { Authorization: token },
            body: {id}
        }).then(res => {
            console.log(res)
        })
    }
    const accept = (e) => {
        const id = e.target.value
        fetch('http://localhost:5000/users/newuser', {
            method: 'PUT',
            headers : { Authorization: token },
            body: {id}
        }).then(res => {
            console.log(res)
        })
    }
    const reject = (e) => {
        const id = e.target.value
        fetch('http://localhost:5000/users/newuser', {
            method: 'DELETE',
            headers : { Authorization: token },
            body: {id}
        }).then(res => {
            console.log(res)
        })
    }

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
                { requests.length>0 && <div>
                    <h3>Requests</h3>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                               { requests.map(req => {
                                    return (<tr key={req._id}>
                                        <td>{req.name}</td>
                                        <td>{req.email}</td>
                                        <td>{req.role}</td>
                                        <td><button className="button primary" onClick={accept} style={{fontSize: '0.8rem'}} value={req._id}>Accept</button></td>
                                        <td><button className="button" style={{fontSize: '0.8rem'}} value={req._id}>Reject</button></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>}
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
                                    return (<tr key={man._id}>
                                        <td>{man.name}</td>
                                        <td>{man.email}</td>
                                        <td><button style={{fontSize: '0.8rem'}} onClick={fire} value={man._id}>Fire</button></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>}
                { developers.length>0 && <div>
                    <h3>Developers</h3>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                               { developers.map(dev => {
                                    return (<tr key={dev._id}>
                                        <td>{dev.name}</td>
                                        <td>{dev.email}</td>
                                        <td><button style={{fontSize: '0.8rem'}} onClick={fire} value={dev._id}>Fire</button></td>
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
