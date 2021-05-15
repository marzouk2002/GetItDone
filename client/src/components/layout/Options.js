import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

function Options({ setSelectedTitle, register }) {

    const handleChoice = (e) => {
        setSelectedTitle(e.target.value)
    }

    return (
        <section  className="inner" style= {inner_style}>
            <div className="row">
                <div className="col-4 col-12-medium color-icons" style= {center_stuf}>
                    <motion.div initial={{opacity:0, x: -50}}
                                animate={{opacity: 1, x:0}}
                                transition={{delay: 0.2, duration: 0.8}} className="option">
                        <h2>Admin</h2>
                        <FontAwesomeIcon className='user-icon admin' icon={faUserAlt}/>
                        <p>{ register ? 'Create an account' : 'Login'} as an Admin</p>
                        <button className="button primary" onClick={handleChoice} value="Admin">{ register ? 'Create' : 'Login'}</button>
                    </motion.div>
                </div>
                <div className="col-4 col-12-medium color-icons" style= {center_stuf}>
                    <motion.div initial={{opacity:0, x: -50}}
                                animate={{opacity: 1, x:0}}
                                transition={{delay: 0.3, duration: 0.7}} className="option">
                        <h2>Project Manager</h2>
                        <FontAwesomeIcon className='user-icon manager' icon={faUserAlt}/>
                        <p>{ register ? 'Create an account' : 'Login'} as a Project Manager</p>
                        <button className="button primary" onClick={handleChoice} value="Project Manager">{ register ? 'Create' : 'Login'}</button>
                    </motion.div>
                </div>
                <div className="col-4 col-12-medium color-icons" style= {center_stuf}>
                    <motion.div initial={{opacity:0, x: -50}}
                                animate={{opacity: 1, x:0}}
                                transition={{delay: 0.4, duration: 0.6}} className="option">
                        <h2>Developer</h2>
                        <FontAwesomeIcon className='user-icon developer' icon={faUserAlt}/>
                        <p>{ register ? 'Create an account' : 'Login'} as a Developer</p>
                        <button className="button primary" onClick={handleChoice} value="Developer">{ register ? 'Create' : 'Login'}</button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

const inner_style = {padding: "1rem 0"}

const center_stuf = {
    display: 'grid',
    placeItems: 'center'
}

export default Options