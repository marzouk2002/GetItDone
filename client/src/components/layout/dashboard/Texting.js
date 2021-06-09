import React, { useState } from 'react'
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'

function Texting() {
    const [ msgInpu, setMsgInpu ] = useState('')
    const textContainer = document.querySelector('.texting-cont')

    const handleChange = (e) => {
        setMsgInpu(e.target.value)
    }

    const openConv = () => {
        document.querySelector('.conversation').classList.add('open')
    }

    const closeConv = () => {
        document.querySelector('.conversation').classList.remove('open')
    }

    return (
        <div className='texting'>
            <div className='btn' onClick={()=>{textContainer.classList.remove('close')}} title='Messages'>
                <FontAwesomeIcon icon={faComments} />
            </div>
            <div className="texting-cont close">
                <header>
                    <div className='btn' onClick={()=>{textContainer.classList.add('close')}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <h2>Messages</h2>
                </header>
                <main>
                    <div className="contacts">
                        <h4 onClick={openConv}>contacts</h4>
                    </div>
                    <div className="conversation">
                        <header>
                            <div className='btn' onClick={closeConv}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </div>
                            <div className='target-info'>

                            </div>
                        </header>
                        <main>

                        </main>
                        <form>
                            <input type="text" name='message' value={msgInpu} onChange={handleChange}/>
                            <input type="submit" value='Send' className='button primary'/>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Texting
