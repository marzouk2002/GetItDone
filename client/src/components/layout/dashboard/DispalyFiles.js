import React, { useEffect, useState } from 'react'
// lodash
import _ from 'lodash'
// motion
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
        </div>
    </div>
    )
}

export default DispalyFiles