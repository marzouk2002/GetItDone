import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Alert({ msgs, deleteMsg }) {
    return (
        <div className="alerts-wrap">
            {msgs.map((msg, i) => {
                return (<div className="alert" key={i}>
                    <p>{msg}</p>
                    <button onClick={()=>{deleteMsg(i)}}><FontAwesomeIcon icon={faTimes} /></button>
                </div>)
            })}
        </div>
    )
}

export default Alert