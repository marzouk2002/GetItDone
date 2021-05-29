import React, { useEffect, useState } from 'react'
// redux
import { useDispatch } from 'react-redux'
import { setServerInfo } from '../../../actions'
// CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function ProjectForm() {
    const [ developers, setDevelopers ] = useState([])
    const [ managers, setManagers ] = useState([])
    const [ formState, setFormState ] = useState({
        title: '',
        description: ''
    })
    const [ selectedDev, setSelectedDev ] = useState({})
    const [ selectedMang, setSelectedMang ] = useState({})
    const [ filesInpu, setFilesInpu ] = useState([])
    const [ srcFiles, setSrcFiles ] = useState([])

    const dispatch = useDispatch()
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
    }, ["1"])

    useEffect(() => {
        if (filesInpu.length === 0) {
            setSrcFiles([])
            return
        }
        const newArr = filesInpu.map(file => {
            const objectUrl = URL.createObjectURL(file)
            return {name: file.name, url:objectUrl}
        })
        setSrcFiles(newArr)
    
        return () => newArr
    }, [ filesInpu ])

    const handleTextChange = (event, editor) => {
        if(editor) {
            const data = editor.getData()
            setFormState({...formState, description: data})
        } else {
            const data = event.target.value
            setFormState({...formState, title: data})
        }
    }

    const handleSelectChange = (e) => {
        const input = e.target.previousElementSibling
        const inputId = input.getAttribute('value')
        const inputType = input.getAttribute('name')
        if(inputType === 'manager') {
            setSelectedMang({...selectedMang, [inputId] : !selectedMang[inputId]})
        } else {
            setSelectedDev({...selectedDev, [inputId] : !selectedDev[inputId]})
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFilesInpu([file, ...filesInpu])
    }

    const deleteFile = (index) => {
        const copyArr = [...filesInpu]
        copyArr.splice(index, 1)
        setFilesInpu(copyArr)
    }

    return (
        <div>
            <h1>Start a Project</h1>
            <div style={{width: '82%', margin: '2rem 0 0 5%'}}>
                <form className='project-form'>
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
                                        
                                        managers.map((mang, i) => {
                                            return (<div key={i} className="field">
                                                <input type="checkbox" value={mang._id} name="manager" checked={selectedMang[mang._id]}/>
                                                <label htmlFor="manager" onClick={handleSelectChange}>{mang.name}</label>
                                            </div>)
                                        })
                                    }
                                </div>
                                <div>
                                    <label htmlFor="developers">Developers</label>
                                    
                                    {
                                        developers.map((dev, i) => {
                                            return (<div key={i} className="field">
                                                <input type="checkbox" value={dev._id} name='developer' checked={selectedDev[dev._id]}/>
                                                <label htmlFor='developer' onClick={handleSelectChange}>{dev.name}</label>
                                            </div>)})
                                    }
                                   
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className='files'  style={{marginTop: '1.5rem'}}>
                        <div className="field">
                            <label htmlFor="files">Files</label>
                            <input type="file" name="files" onChange={handleFileChange}/>
                        </div> 
                        <div className="files-selected">
                            {
                                srcFiles.map((src,i) =>
                                    (<div className="preview-file" key={i}>
                                        <picture className='bg'>
                                            <source srcSet={src.url} alt=''/>
                                            <img src={src.url} alt=''/>
                                        </picture>
                                        <div className="file-name">
                                            <p>{src.name}</p>
                                        </div>
                                        <div className="delete">
                                            <FontAwesomeIcon icon={faTrashAlt} onClick={()=>deleteFile(i)}/>
                                        </div>
                                    </div>)
                                )
                            }
                        </div>
                    </div>
                    <div className='center_stuf' style={{marginTop: '2rem'}}>
                            <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectForm
