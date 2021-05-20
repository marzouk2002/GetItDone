import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from './layout/Form'
import Options from './layout/Options'

function Register() {
    const [ selectedTitle, setSelectedTitle ] = useState(null)

    return (
        <>
            <main>
                <header className="major" style={titleStyle}>
                        <h1>Create an account</h1>
                </header>
                { selectedTitle ? <Form selectedTitle={selectedTitle}  setSelectedTitle={setSelectedTitle} register={true}/> : <Options register={true} setSelectedTitle={setSelectedTitle}/> } 
                <footer className='center_stuf'>
                    <p>Have an acoount? <Link to='/login'>login now!</Link></p>
                </footer>
            </main>
        </>
    )
}

const titleStyle = {
    margin: '5vmin auto',
    textAlign: 'center'
}

export default Register
