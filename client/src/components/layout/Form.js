import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

function Form({ selectedTitle, setSelectedTitle }) {
    const [seletected, setSelected] = useState('')

    useEffect(() => {
        switch(selectedTitle) {
            case('Admin'):
                setSelected('admin')
                break
            case('Project Manager'):
                setSelected('manager')
                break
            case('Developer'):
                setSelected('developer')
                break
            default:
                setSelected('')
        }
    }, [selectedTitle])

    const goBack = () => {
        setSelectedTitle(null)
    }

    return (
        <section  className="inner" style= {inner_style}>
            <div className="button small" onClick={goBack}><FontAwesomeIcon icon={faChevronLeft}/> Back</div>
            <div style={center_stuf}>
                <h2>{ selectedTitle }</h2>
                <form style={{...center_stuf, width:"80%" }}>
                    <div className="fields">
                        { seletected !== "admin" &&
                            <motion.div initial={{opacity:0, y: 20}}
                                        animate={{opacity: 1, y:0}}
                                        transition={{delay: 0.2, duration: 0.8}} className="field">
                                <label htmlFor="name">Admin Serial Number for {seletected+'s'}</label>
                                <input type="text" name="serialNumber" required/>
                            </motion.div>
                        } 
                        <motion.div initial={{opacity:0, y: 20}}
                                    animate={{opacity: 1, y:0}}
                                    transition={{delay: 0.3, duration: 0.8}} className="field">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" required/>
                        </motion.div>
                        <motion.div initial={{opacity:0, y: 20}}
                                    animate={{opacity: 1, y:0}}
                                    transition={{delay: 0.4, duration: 0.8}} className="field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" required/>
                        </motion.div>
                        <motion.div initial={{opacity:0, y: 20}}
                                    animate={{opacity: 1, y:0}}
                                    transition={{delay: 0.5, duration: 0.8}} className="field">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" required/>
                        </motion.div>
                        <motion.div initial={{opacity:0, y: 20}}
                                    animate={{opacity: 1, y:0}}
                                    transition={{delay: 0.6, duration: 0.8}} className="field">
                            <label htmlFor="confirm">Confirm password</label>
                            <input type="password" name="confirm" required/>
                        </motion.div>
                    </div>
                    <input type="submit" value="Register" className="primary" />
                </form>
            </div>
        </section>
    )
}

const inner_style = {padding: "1rem 0"}

const center_stuf = {
    display: 'grid',
    placeItems: 'center'
}

export default Form
