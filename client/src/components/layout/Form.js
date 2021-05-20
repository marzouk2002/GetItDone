import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
// font awesome and framer motion
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
// redux store 
import { useDispatch } from 'react-redux'
import { setInfo, isLogged } from '../../actions'
import { useHistory } from 'react-router';

function Form({ register, selectedTitle, setSelectedTitle, msgs, setMsgs }) {
    const [seletected, setSelected] = useState('')
    const [formState, setFormState] = useState({})
    const [fileImg, setFileImg] = useState(null)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        switch(selectedTitle.toLowerCase()) {
            case 'admin':
                setSelected('admin')
                break
            case 'project manager':
                setSelected('manager')
                break
            case 'developer':
                setSelected('developer')
                break
            default:
                setSelected('')
            
        }
    }, [selectedTitle, register])

    const goBack = () => {
        setSelectedTitle(null)
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

        axios.post(`http://localhost:5000/users/${route}`, formData)
        .then(res => {
            const data = res.data
            if(data.success) {
                if(register) {
                    history.push({
                        pathname:"/login",
                        state: {
                            msgs: data.msgs,
                            selected: seletected
                        }
                    })
                } else {
                    setMsgs(data.msgs)
                    localStorage.setItem('token', data.token)
                    dispatch(setInfo(data.user))
                    dispatch(isLogged(true))
                }
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

Form.protoTypes = {
    register: PropTypes.bool.isRequired,
    selectedTitle: PropTypes.string.isRequired,
    setSelectedTitle: PropTypes.func.isRequired,
    msgs: PropTypes.any,
    setMsgs: PropTypes.func
}

const inner_style = {padding: "1rem 0"}

export default Form
