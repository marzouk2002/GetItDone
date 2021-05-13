import React from 'react'
import Header from './layout/Header'

function Register() {
    return (
        <>
            <Header/>
            <header className="major" style={titleStyle}>
                <h1>Create an account</h1>
            </header>
        </>
    )
}

const titleStyle = {
    margin: '5vmin auto',
    textAlign: 'center'
}

export default Register
