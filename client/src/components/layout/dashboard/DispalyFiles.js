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
        fetch('http://localhost:5000/app/projectfile', {
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

        axios.post("http://localhost:5000/app/projectfile", formData,{
            headers: { Authorization: token },
        })
        .then(res => {
            console.log(res)
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
                    transition={{delay: 0.4, duration: 0.8}} type='submit' value='Submit' onClick={submitFiles} className='btn primary'/> : ''} 
            </div>
            {
                files.map((file, i) => {
                    const filetypes= /jpeg|jpg|png|gif/
                    // Check ext
                    const isImage = filetypes.test(file.extention)
                    return (<div className="file-card" key={i}>
                        {isImage ? <img src={'http://localhost:5000/' + file.path} alt={file.name} /> : '' }
                        <div className="content">
                            <h4>{file.name}</h4>
                            <div className='btns'>
                                <FontAwesomeIcon icon={faDownload}/>
                                <FontAwesomeIcon icon={faTrashAlt} onClick={()=>deleteFile(file)}/>
                            </div>
                        </div>
                    </div>)
                })
            }
        </div>
    </div>)
}

export default DispalyFiles