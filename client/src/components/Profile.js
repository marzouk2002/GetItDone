import React, { useState } from 'react'
import { Redirect } from 'react-router'
// components
import Alert from './layout/Alert'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo } from '../actions'
// axios
import axios from 'axios'
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'

function Profile() {
    const userInfo = useSelector(state => state.userInfo)
    const isLogin = useSelector(state => state.login)
    const [formState, setFormState] = useState({})
    const [msgs, setMsgs] = useState(null)
    const [fileImg, setFileImg] = useState(null)

    const dispatch = useDispatch()

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
        const formData = new FormData()
        Object.entries(formState).map(item => {
            return formData.append(item[0], item[1])
        })
 
        formData.append('file', fileImg) 
        const token = localStorage.getItem('token')
        axios.post('http://localhost:5000/users/update', formData,{
            headers: { Authorization: token }
        })
        .then(res => {
            const { user, msgs, errors, success } = res.data
            if(success) {
                setMsgs(msgs)
                dispatch(setUserInfo(user))
            } else {
                setMsgs(errors)
            }
        })
        .catch(err => console.error(err))
     }

    return (
        <main>
            { !isLogin && <Redirect to={{pathname: "/login", state: {msgs:[{text: 'Sorry you should logged in to access that page',type:"danger" }]}}} /> }
            <header className="major" style={{marginLeft: '10%'}}>
                    <h1>Profile</h1>
            </header>
            <section className="inner" style= {inner_style}>
                <div className="row">
                    <div className="col-6 col-12-small profile-pic">
                        <div className="img">
                            <form > 
                            { userInfo.picture ? <img src={userInfo.picture} alt="profile" /> :
                            <FontAwesomeIcon className={`user-icon user-icon-large ${userInfo.role}`}  icon={faUserAlt}/>} 
                                <input type="file" onChange={handleChangeForImg} accept='image/*'/>
                            </form>
                        </div>
                    </div>
                    <div className="col-6 col-12-small profile-info">
                        <div>
                            <h3>Name:</h3>
                            <p>{userInfo.name}</p>
                            <h3>Email:</h3>
                            <p>{userInfo.email}</p>
                            <h3>Role:</h3>
                            <p>{userInfo.role}</p>
                            <h3>Server Id:</h3>
                            <p>{userInfo.serverId}</p>
                        </div>
                    </div>
                </div >
                <div  style={{margin: '3rem 0' }}>
                    <h2 style={{marginBottom: '1rem' }}>Change some thing?<sub style={subStyle}>* fill only the fields you would like to change (this include the image above)</sub></h2>
                    { msgs && <Alert msgs={msgs} deleteMsg={deleteMsg} />}
                    <form style={{width:"80%", margin: 'auto' }} className="center_stuf" onSubmit={handleSubmit}>
                        <div className="fields">
                            <div className="field">
                                <label htmlFor="name">Name</label>
                                <input onChange={handleChange} type="text" name="name"/>
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input onChange={handleChange} type="email" name="email"/>
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <input onChange={handleChange} type="password" name="password"/>
                            </div>
                            <div className="field">
                                <label htmlFor="confirm">Confirm password</label>
                                <input onChange={handleChange} type="password" name="confirm"/>
                            </div>
                        </div>
                        <input type="submit" value='Update' className="primary" />
                    </form>
                </div>
            </section>
        </main>
    )
}

const inner_style = {padding: "1rem 0"}

const subStyle = {
    fontSize: "0.8rem",
    padding: "0.5rem",
    fontFamily: "sans-serif",
    fontWeight: 100
}

export default Profile