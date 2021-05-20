import React, { useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
// components
import Form from './layout/Form'
import Options from './layout/Options'
import Alert from './layout/Alert'

function Login() {
    const location = useLocation()
    const selected = location.state?.selected
    const [ selectedTitle, setSelectedTitle ] = useState(selected)
    const [msgs, setMsgs] = useState(location.state?.msgs)

    const deleteMsg = (target) => {
        setMsgs(msgs.filter((msg, index)=>index!==target))
    }

    return (
        <>
            <main>
                <header className="major" style={titleStyle}>
                        <h1>Login</h1>
                </header>
                { msgs && <Alert msgs={msgs} deleteMsg={deleteMsg} />}
                { selectedTitle ? <Form selectedTitle={selectedTitle}  setSelectedTitle={setSelectedTitle} register={false} msgs={msgs} setMsgs={setMsgs}/> : <Options register={false} setSelectedTitle={setSelectedTitle}/> } 
            </main>
            <footer className='center_stuf'>
                <p>No acoount? <Link to='/register'>Create one now!</Link></p>
            </footer>
        </>
    )
}

const titleStyle = {
    margin: '5vmin auto',
    textAlign: 'center'
}

export default Login