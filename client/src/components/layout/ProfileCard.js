import React from 'react'
// redux
import { useSelector } from 'react-redux'

function ProfileCard() {
    const userInfo = useSelector(state => state.userInfo)

    return (
        <div>
            <div className='image'>
                <img src={'http://localhost:5000' + userInfo.picture} alt="profile" />
            </div>
            
        </div>
    )
}

export default ProfileCard