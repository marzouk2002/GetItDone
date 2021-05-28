import React, { useEffect, useState } from 'react'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { setServerInfo } from '../../../actions'
// CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ProjectForm() {
    const [ developers, setDevelopers ] = useState([])
    const [ managers, setManagers ] = useState([])
    const [ formState, setFormState ] = useState({
        title: '',
        description: '',
        managers:[],
        developers:[]
    })

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

    const handleTextChange = (event, editor) => {
        if(editor) {
            const data = editor.getData()
            setFormState({...formState, description: data})
        } else {
            const data = event.target.value
            setFormState({...formState, title: data})
        }
    }

    return (
        <div>
            <h1>Start a Project</h1>
            <div style={{width: '82%', margin: '2rem 0 0 5%'}}>
                <form>
                    <div className="field">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" onChange={handleTextChange} required/>
                    </div> 
                    <div className="row">
                        <div className="col-7 col-12-medium" style={{marginTop: '2rem'}}>
                            <div className="field">
                                <label htmlFor="description">Description</label>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={formState.description}
                                    onChange={handleTextChange}
                                    />
                            </div> 
                        </div>
                        <div className="col-5 col-12-medium">
                            <div className="selecet-staff">
                                <div>
                                    <label htmlFor="managers">Managers</label>
                                    {
                                        managers.map((mang, i) => (<div key={i}className="field">
                                            <input type="checkbox" value={mang._id} name='manger' checked={true}/>
                                        <label htmlFor='manger'>{mang.name}</label>
                                            </div>))
                                    }
                                </div>
                                <div>
                                    <label htmlFor="developers">Developers</label>
                                    
                                    {
                                        developers.map((dev, i) => (<div key={i}className="field">
                                            <input type="checkbox" value={dev._id} name='developer' checked={true}/>
                                        <label htmlFor='developer'>{dev.name}</label>
                                            </div>))
                                    }
                                   
                                </div>
                            </div> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectForm
