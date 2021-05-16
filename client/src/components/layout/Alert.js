import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

function Alert({ msgs, deleteMsg }) {
    return (
        <div className="alerts-wrap">
            {msgs.map((msg, i) => {
                return (
                <motion.div initial={{opacity:0, scale: 0.5}}
                            animate={{opacity: 1, scale:1}}
                            transition={{delay: 0.1, duration: 0.6}} 
                            className={"alert alert-"+msg.type} key={i}>
                    <div className= 'alert-msg'>
                        <p>{msg.text}</p>
                    </div>
                    <div className='alert-btn'>
                        <div className="alert-svg" onClick={()=>{deleteMsg(i)}}>
                        <FontAwesomeIcon icon={faTimes}/>
                        </div>
                    </div>
                </motion.div>)
            })}
        </div>
    )
}

export default Alert