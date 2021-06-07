import React from 'react'
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Texting() {
    const textContainer = document.querySelector('.texting-cont')

    return (
        <div className='texting'>
            <div className='btn' onClick={()=>{textContainer.classList.remove('close')}} title='Messages'>
                <FontAwesomeIcon icon={faComments} />
            </div>
            <div className="texting-cont close">
                <header>
                    <div className='btn' onClick={()=>{textContainer.classList.add('close')}}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                    <h2>Messages</h2>
                </header>
                <form>
                    <input type="text" name='message'/>
                    <input type="submit" value='Send' className='button primary'/>
                </form>
            </div>
        </div>
    )
}

export default Texting
