import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { setServerInfo } from '../actions'

function Server() {
    const [ developers, setDevelopers ] = useState([])
    const [ managers, setManagers ] = useState([])
    const [ requests, setRequests ] = useState([])
    const [ projects, setProjects ] = useState([])
    const [ update, setUpdate ] = useState(0)

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo)
    const token = localStorage.getItem('token')
    
    useEffect(()=> {
            fetch('http://localhost:5000/app/serverinfo', {
                headers : { Authorization: token }
            })
            .then(res => res.json())
            .then(data => {
                const { developers, managers, requests, projects } = data.serverInfo
                setDevelopers(developers)
                setManagers(managers)
                setRequests(requests)
                setProjects(projects)
                dispatch(setServerInfo(data.serverInfo))
            })
    }, [ update, token ])

    const accept = (e) => {
        const id = e.target.value
        fetch('http://localhost:5000/users/newuser?user_id='+id, {
            method: 'PUT',
            headers : { Authorization: token },
        }).then(res => setUpdate(update+1))
        .catch(err => console.log(err))
        
    }

    const rejectAndFire = (e) => {
        const id = e.target.value
        fetch('http://localhost:5000/users/newuser?user_id='+id, {
            method: 'DELETE',
            headers : { Authorization: token },
            body: {id}
        }).then(res => setUpdate(update+1))
        .catch(err => console.log(err))
    }

    const deletePro = (e) => {
        const id = e.target.value
        fetch('http://localhost:5000/app/deletepro?pro_id='+id, {
            method: 'DELETE',
            headers : { Authorization: token },
            body: {id}
        }).then(res => setUpdate(update+1))
        .catch(err => console.log(err))
    }

    return (
        <main>
            { userInfo?.role!=='admin' ? <Redirect to={{pathname: "/login", state: {msgs:[{text: 'Sorry you should be an admin access that page',type:"danger" }]}}} /> :
            <>
            <header className="major" style={{marginLeft: '10%'}}>
                    <h1>Server</h1>
            </header>
            <section className="inner" style= {inner_style}>
                <div>
                    <h3 style={{marginBottom:'0', lineHeight: 'normal'}}>Server Id: </h3>
                    <h1 className="center_stuf">{userInfo.serverId}</h1>
                </div>
                { requests.length ? <div>
                    <h3 className="center_stuf">Requests</h3>
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
                                        <td><button className="button" onClick={rejectAndFire} style={{fontSize: '0.8rem'}} value={req._id}>Reject</button></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div> : ''}
                <div>
                    <h3 className="center_stuf">Admin</h3>
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
                { managers.length ? <div>
                    <h3 className="center_stuf">Managers</h3>
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
                                        <td><button style={{fontSize: '0.8rem'}} onClick={rejectAndFire} value={man._id}>Fire</button></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div> : ''}
                { developers.length && <div>
                    <h3 className="center_stuf">Developers</h3>
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
                                        <td><button style={{fontSize: '0.8rem'}} onClick={rejectAndFire} value={dev._id}>Fire</button></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>}
                { projects.length ? <div>
                    <h3 className="center_stuf">Projects</h3>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Completion</th>
                                </tr>
                            </thead>
                            <tbody>
                               { projects.map(pro => {
                                    return (<tr key={pro._id}>
                                        <td>{pro.title}</td>
                                        <td style={{paddingLeft: '2.5rem'}}>{pro.completion} %</td>
                                        <td style={{textAlign: 'center'}}><button style={{fontSize: '0.8rem'}} onClick={deletePro} value={pro._id}>Delete</button></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div> : ''}
            </section></>
             }
        </main>
    )
}

const inner_style = {padding: "1rem 0"}

export default Server
