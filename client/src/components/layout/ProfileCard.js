import React from 'react'
import { Link } from 'react-router-dom'
// redux
import { useSelector } from 'react-redux'

function ProfileCard() {
    const userInfo = useSelector(state => state.userInfo)

    return (
        <>
        <Link to="/profile" className="button primary fit profile-card">
            <div className='image'>
                <img src={'http://localhost:5000' + userInfo.picture} alt="profile" />
            </div>
            <div className='name'>
                <p>{userInfo.name}</p><p className="email">{userInfo.email}</p>
            </div>
        </Link>
        </>
    )
}

export default ProfileCard