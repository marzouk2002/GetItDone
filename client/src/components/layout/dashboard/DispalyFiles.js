import React, { useState } from 'react'
// lodash
import _ from 'lodash'
// motion & fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faDownload } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

function DispalyFiles({ files }) {
    const [ filesInpu, setFilesInput ] = useState([])

    const handleInputFileChange = (e) => {
        const fileArr = []
        const { files } = e.target;
        _.forEach(files, file => {
            if(file) fileArr.push(file)
        });
        setFilesInput([...fileArr])
    }

    return (
        <div>
        <label>Files</label>
        <div className="display-files">
            <input type="file" name="files" onChange={handleInputFileChange} multiple/>
            { filesInpu.length ? <motion.input initial={{opacity:0, y: '100%'}}
                animate={{opacity: 1, y:0}}
                transition={{delay: 0.4, duration: 0.8}} type='submit' value='Submit' className='btn primary'/> : ''} 
            {
                files.map((file, i) => {
                    const filetypes= /jpeg|jpg|png|gif/
                    // Check ext
                    const isImage = filetypes.test(file.extention)
                    return (<div className="file-card" key={i}>
                        {isImage ? <img src={'http://localhost:5000/' + file.path} alt={file.name} /> : '' }
                        <h4>{file.name}</h4>
                        <div className='btns'>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                            <FontAwesomeIcon icon={faDownload}/>
                        </div>
                    </div>)
                })
            }
        </div>
    </div>)
}

export default DispalyFiles