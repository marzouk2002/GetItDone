import React, { useEffect, useState } from 'react'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { setServerInfo } from '../../../actions'

function ProjectForm() {
    const [ developers, setDevelopers ] = useState([])
    const [ managers, setManagers ] = useState([])

    const dispatch = useDispatch()
    const serverInfo = useSelector(state => state.serverInfo)
    const token = localStorage.getItem('token')

    useEffect(()=> {
        fetch('http://localhost:5000/app/serverinfo', {
            headers : { Authorization: token }
        })
        .then(res => res.json())
        .then(data => {
            const { developers, managers } = data.serverInfo
            setDevelopers(developers)
            setManagers(managers)
            dispatch(setServerInfo(data.serverInfo))
        })
    }, [ token, dispatch, serverInfo ])

    return (
        <div>
            <h1>Start a Project</h1>
            <div style={{width: '80%', marginLeft: '5%'}}>
                <form>
                    <div className="field">
                        <label htmlFor="name">Title</label>
                        <input type="text" name="name" required/>
                    </div> 
                    <div className="row">

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectForm
