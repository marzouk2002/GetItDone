import React from 'react'
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Texting() {
    return (
        <div className='texting'>
            <div className='btn'>
                <FontAwesomeIcon icon={faComments} />
            </div>
            <div className="texting-cont">
                <header>
                    <div className='btn'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                    <h2>Messages</h2>
                </header>
            </div>
        </div>
    )
}

export default Texting
