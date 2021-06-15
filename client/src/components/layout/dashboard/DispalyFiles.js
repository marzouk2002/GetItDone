import React, { useState } from 'react'
// lodash
import _ from 'lodash'
// motion & fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faDownload } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
// axios 
import axios from 'axios'

function DispalyFiles({ files, projectId, setUpDate }) {
    const [ filesInpu, setFilesInput ] = useState([])

    const handleInputFileChange = (e) => {
        const fileArr = []
        const { files } = e.target;
        _.forEach(files, file => {
            if(file) fileArr.push(file)
        });
        setFilesInput([...fileArr])
    }

    const token = localStorage.getItem('token')

    const deleteFile = (file) => {
        fetch('/app/projectfile', {
            method: 'DELETE',
            body: JSON.stringify({ file, projectId }),
            headers : { "Authorization": token, "Content-Type" : "application/json" }
        }).then(res => setUpDate(Math.random() * 10000))
        .catch(err => console.error(err))

    }

    const submitFiles = () => {
        const formData = new FormData()

        _.forEach(filesInpu, file => {
            formData.append('files', file);
        });

        formData.append('projectId', projectId);

        axios.post("/app/projectfile", formData,{
            headers : { "Authorization": token}
        })
        .then(res => {
            setFilesInput([])
            setUpDate(Math.random()*10000)
        })
        .catch(err=>console.error(err))
    }

    return (
        <div>
            <label>Files</label>
            <div className="display-files">
                <div className='inputs'>
                    <input type="file" name="files" onChange={handleInputFileChange} multiple/>
                    { filesInpu.length ? <motion.input initial={{opacity:0, y: '100%'}}
                        animate={{opacity: 1, y:0}}
                        transition={{delay: 0.1, duration: 0.5}} type='submit' value='Submit' onClick={submitFiles} className='btn primary'/> : ''} 
                </div>
                {
                    files.map((file, i) => {
                        const filetypes= /jpeg|jpg|png|gif/
                        // Check ext
                        const isImage = filetypes.test(file.extention)
                        return (<motion.div initial={{opacity:0, scale:0.5}}
                        animate={{opacity: 1, scale:1}}
                        transition={{delay: i*0.1+0.1, duration: 0.3}} 
                        className="file-card" key={i}>
                            {isImage ? <img src={'/' + file.path} alt={file.name} /> : '' }
                            <div className="content">
                                <h4>{file.name}</h4>
                                <div className='btns'>
                                    <a href={'/' + file.path} download rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon={faDownload}/></a>
                                    <FontAwesomeIcon icon={faTrashAlt} onClick={()=>deleteFile(file)}/>
                                </div>
                            </div>
                        </motion.div>)
                    })
                }
            </div>
        </div>)
}

export default DispalyFiles