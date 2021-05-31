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
// axios 
import axios from 'axios'
// lodash
import _ from 'lodash'

function ProjectForm({ projects, setProjects, setLoading }) {
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
    }, [1])

    useEffect(() => {
        if (filesInpu.length === 0) {
            setSrcFiles([])
            return
        }
        const newArr = filesInpu.map(file => {
            const patr= /^image/
            if(!patr.test(file.type)) return {name: file.name, url:null}
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
        const name = e.target.getAttribute('name')
        const input = e.target.previousElementSibling
        const inputId = input.getAttribute('value')
        const inputType = input.getAttribute('name')
        if(inputType === 'manager') {
            setSelectedMang({...selectedMang, [inputId] : {state: !selectedMang[inputId]?.state, name}})
        } else {
            setSelectedDev({...selectedDev, [inputId] : {state: !selectedDev[inputId]?.state, name}})
        }
    }

    const handleFileChange = (e) => {
        const fileArr = []
        const { files } = e.target;
        _.forEach(files, file => {
            if(file) fileArr.push(file)
        });
        setFilesInpu([...fileArr, ...filesInpu])
    }

    const deleteFile = (index) => {
        const copyArr = [...filesInpu]
        copyArr.splice(index, 1)
        setFilesInpu(copyArr)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        Object.entries(formState).map(item => {
            return formData.append(item[0], item[1])
        })
        
        _.forEach(filesInpu, file => {
            formData.append('files', file);
        });

        formData.append('managers', [])
        formData.append('developers', [])
        Object.entries(selectedMang).forEach(mang => {
            if(mang[1].state) return formData.append('managers', JSON.stringify({ id: mang[0], name: mang[1].name}))
        })
        
        Object.entries(selectedDev).forEach(dev => {
            if(dev[1].state) return formData.append('developers', JSON.stringify({ id: dev[0], name: dev[1].name }))
        })
        

        axios.post("http://localhost:5000/app/addproject", formData,{
            headers: { Authorization: token },
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent
                return loaded < total ? setLoading(true) : setLoading(false)
            }
        })
            .then(res=>{
                const { project } = res.data
                setProjects([...projects, project])
            })
            .catch(err=>console.error(err))
    }

    return (
        <div>
            <h1>Start a Project</h1>
            <div style={{ margin: '2rem 4%' }}>
                <form onSubmit={handleSubmit} className='project-form'>
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
                                                <input type="checkbox" value={mang._id} name="manager" checked={selectedMang[mang._id]?.state}/>
                                                <label htmlFor="manager" name={mang.name} onClick={handleSelectChange}>{mang.name}</label>
                                            </div>)
                                        })
                                    }
                                </div>
                                <div>
                                    <label htmlFor="developers">Developers</label>
                                    
                                    {
                                        developers.map((dev, i) => {
                                            return (<div key={i} className="field">
                                                <input type="checkbox" value={dev._id} name='developer' checked={selectedDev[dev._id]?.state}/>
                                                <label htmlFor='developer' name={dev.name} onClick={handleSelectChange}>{dev.name}</label>
                                            </div>)})
                                    }
                                   
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className='files'  style={{marginTop: '1.5rem'}}>
                        <div className="field">
                            <label htmlFor="files">Files</label>
                            <input type="file" name="files" multiple onChange={handleFileChange}/>
                        </div> 
                        <div className="files-selected">
                            {
                                srcFiles.map((src,i) =>
                                    (<div className="preview-file" key={i}>
                                        { src.url &&  <picture className='bg'>
                                            <source srcSet={src.url} alt=''/>
                                            <img src={src.url} alt=''/>
                                        </picture>}
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
