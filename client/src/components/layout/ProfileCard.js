import React from 'react'
import { Link } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'

function ProfileCard() {
    const userInfo = useSelector(state => state.userInfo)

    return (
        <>
        <Link to="/profile" className="button primary fit profile-card">
            <div className='image'>
                { userInfo.picture ? <img src={'http://localhost:5000' + userInfo.picture} alt="profile" /> :
                 <FontAwesomeIcon className={`user-icon user-icon-small ${userInfo.role}`}  icon={faUserAlt}/>} 
            </div>
            <div className='name'>
                <p>{userInfo.name}</p><p className="email">{userInfo.email}</p>
            </div>
        </Link>
        </>
    )
}

export default ProfileCard