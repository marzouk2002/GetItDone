import React, { useState } from 'react'
import { useLocation } from 'react-router'
// components
import Form from './layout/Form'
import Options from './layout/Options'

function Login() {
    const location = useLocation()
    const msgs = location.state?.msgs
    const selected = location.state?.selected
    const [ selectedTitle, setSelectedTitle ] = useState(selected)

    return (
        <>
            <main>
                <header className="major" style={titleStyle}>
                        <h1>Login</h1>
                </header>
                { selectedTitle ? <Form selectedTitle={selectedTitle}  setSelectedTitle={setSelectedTitle} register={false} msgsProp={msgs}/> : <Options register={false} setSelectedTitle={setSelectedTitle}/> } 
            </main>
            <footer className='center_stuf'>
                <p>No acoount? <a href='/register'>Create one now!</a></p>
            </footer>
        </>
    )
}

const titleStyle = {
    margin: '5vmin auto',
    textAlign: 'center'
}

export default Login