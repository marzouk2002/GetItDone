import React, { useState } from 'react'
import { useLocation } from 'react-router'
import Form from './layout/Form'
import Header from './layout/Header'
import Options from './layout/Options'

function Login() {
    const location = useLocation()
    const { msgs, selected }= location.state
    const [ selectedTitle, setSelectedTitle ] = useState(selected)

    return (
        <>
            <Header/>
            <header className="major" style={titleStyle}>
                    <h1>Login</h1>
            </header>
            <main>
                { selectedTitle ? <Form selectedTitle={selectedTitle}  setSelectedTitle={setSelectedTitle} register={false} msgsProp={msgs}/> : <Options register={false} setSelectedTitle={setSelectedTitle}/> } 
            </main>
        </>
    )
}

const titleStyle = {
    margin: '5vmin auto',
    textAlign: 'center'
}

export default Login