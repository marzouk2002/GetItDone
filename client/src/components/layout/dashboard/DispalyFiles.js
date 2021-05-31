import React, { useState } from 'react'
import _ from 'lodash'

export default function DispalyFiles({ files }) {
    const [ filesInpu, setFilesInput ] = useState(null)

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
            <input type='submit' value='Submit' className='btn primary'/>
        </div>
    </div>
    )
}
