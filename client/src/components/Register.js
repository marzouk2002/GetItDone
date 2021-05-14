import React, { useState } from 'react'
import Header from './layout/Header'
import Options from './layout/Options'

function Register() {
    return (
        <>
            <Header/>
            <header className="major" style={titleStyle}>
                <h1>Create an account</h1>
            </header>
            <main>
                <Options/>
            </main>
        </>
    )
}

const titleStyle = {
    margin: '5vmin auto',
    textAlign: 'center'
}

export default Register
