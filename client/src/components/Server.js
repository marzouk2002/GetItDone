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
                <div>
                    <h3 style={{marginBottom:'0', lineHeight: 'normal'}}>Server Id: </h3>
                    <h2 style={{marginLeft:'4rem'}}>{userInfo.serverId}</h2>
                </div>
                <div>
                    <h3>Admin</h3>
                    <div class="table-wrapper">
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
                <div>
                    <h3>Managers</h3>
                    <div class="table-wrapper">
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
                                    <td>{userInfo.role}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    )
}

const inner_style = {padding: "1rem 0"}

export default Server
