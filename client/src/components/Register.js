import React, { useState } from 'react'
import Form from './layout/Form'
import Header from './layout/Header'
import Options from './layout/Options'

function Register() {
    const [ selectedTitle, setSelectedTitle ] = useState(null)

    return (
        <>
            <Header/>
            <header className="major" style={titleStyle}>
                    <h1>Create an account</h1>
            </header>
            <main>
                { selectedTitle ? <Form selectedTitle={selectedTitle}  setSelectedTitle={setSelectedTitle} register={true} /> : <Options register={true} setSelectedTitle={setSelectedTitle}/> } 
            </main>
        </>
    )
}

const titleStyle = {
    margin: '5vmin auto',
    textAlign: 'center'
}

export default Register
