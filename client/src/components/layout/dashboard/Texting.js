import React from 'react'
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'

function Texting() {
    return (
        <div className='texting'>
            <div className='btn'>
                <FontAwesomeIcon icon={faComments} />
            </div>
        </div>
    )
}

export default Texting
