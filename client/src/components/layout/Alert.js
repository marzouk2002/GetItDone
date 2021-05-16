import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Alert({ msgs, deleteMsg }) {
    return (
        <div className="alerts-wrap">
            {msgs.map((msg, i) => {
                return (<div className={"alert alert-"+msg.type} key={i}>
                    <div className= 'alert-msg'>
                        <p>{msg.text}</p>
                    </div>
                    <div className='alert-btn'>
                        <div className="alert-svg" onClick={()=>{deleteMsg(i)}}>
                        <FontAwesomeIcon icon={faTimes}/>
                        </div>
                    </div>
                </div>)
            })}
        </div>
    )
}

export default Alert