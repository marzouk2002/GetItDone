import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import Alert from './Alert'
import axios from 'axios'

function Form({ register, selectedTitle, setSelectedTitle, msgsProp }) {
    const [seletected, setSelected] = useState('')
    const [formState, setFormState] = useState({})
    const [fileImg, setFileImg] = useState(null)
    const [msgs, setMsgs] =useState(msgsProp)

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
    }, [selectedTitle, register])

    const goBack = () => {
        setSelectedTitle(null)
    }

    const deleteMsg = (target) => {
        setMsgs(msgs.filter((msg, index)=>index!==target))
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: value
        })
    }

    const handleChangeForImg = (e) => {
        const file = e.target.files[0];
        setFileImg(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const route = register ? 'register' : 'login'

        const formData = new FormData()
        Object.entries(formState).map(item => {
            return formData.append(item[0], item[1])
        })

        formData.append('role', seletected)
        formData.append('file', fileImg)

        axios.post('http://localhost:5000/users/' + route, formData)
        .then(res => {
            const data = res.data
            if(data.registered) {
                setMsgs(data.msgs)
            } else {
                setMsgs(data.errors)
            }
        })
        .catch(err => console.error(err))
    }

    return (
        <section  className="inner" style= {inner_style}>
            <div className="button small" onClick={goBack} style={{position: 'absolute'}}><FontAwesomeIcon icon={faChevronLeft}/> Back</div>
            <div className="center_stuf">
                <h2>{ selectedTitle }</h2>
                { msgs && <Alert msgs={msgs} deleteMsg={deleteMsg} />}
                <form style={{width:"80%" }} className="center_stuf" onSubmit={handleSubmit}>
                    {
                        register &&
                        <div className="center_stuf">
                                {fileImg && <p>{fileImg.name}</p>}
                            <div className="img-input">
                                <FontAwesomeIcon className={`user-icon ${seletected}`} icon={faUserAlt}/>
                                <input onChange={handleChangeForImg} type="file" title="add a picture if you wanted to" accept='image/*' name="img"/>
                            </div>
                        </div>
                        
                    }
                    <div className="fields">
                        {
                            (register & seletected !== "admin") ?
                            <motion.div initial={{opacity:0, y: 20}}
                                        animate={{opacity: 1, y:0}}
                                        transition={{delay: 0.2, duration: 0.8}} className="field">
                                <label htmlFor="name">Server Id</label>
                                <input onChange={handleChange} type="text" name="serverId" required/>
                            </motion.div> : ""
                        }
                        {
                            register &&
                            <motion.div initial={{opacity:0, y: 20}}
                                        animate={{opacity: 1, y:0}}
                                        transition={{delay: 0.3, duration: 0.8}} className="field">
                                <label htmlFor="name">Name</label>
                                <input onChange={handleChange} type="text" name="name" required/>
                            </motion.div>
                        }
                        <motion.div initial={{opacity:0, y: 20}}
                                    animate={{opacity: 1, y:0}}
                                    transition={{delay: 0.4, duration: 0.8}} className="field">
                            <label htmlFor="email">Email</label>
                            <input onChange={handleChange} type="email" name="email" required/>
                        </motion.div>
                        <motion.div initial={{opacity:0, y: 20}}
                                    animate={{opacity: 1, y:0}}
                                    transition={{delay: 0.5, duration: 0.8}} className="field">
                            <label htmlFor="password">Password</label>
                            <input onChange={handleChange} type="password" name="password" required/>
                        </motion.div>
                        {
                            register && 
                            <motion.div initial={{opacity:0, y: 20}}
                                        animate={{opacity: 1, y:0}}
                                        transition={{delay: 0.6, duration: 0.8}} className="field">
                                <label htmlFor="confirm">Confirm password</label>
                                <input onChange={handleChange} type="password" name="confirm" required/>
                            </motion.div>
                        }
                    </div>
                    <input type="submit" value={ register ? 'Register' : 'Login'} className="primary" />
                </form>
            </div>
        </section>
    )
}

const inner_style = {padding: "1rem 0"}

export default Form
