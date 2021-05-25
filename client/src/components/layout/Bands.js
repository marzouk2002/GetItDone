import React from 'react'
import { Link } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux'

function Bands() {
    const userInfo = useSelector(state => state.userInfo)

    const mounseEntB1 = () => {
        document.querySelector('.main').classList.add("open-band-1")
    }

    const mounseLeavB1 = () => {
        document.querySelector('.main').classList.remove("open-band-1")
    }

    return (
        <div className='band-wrapper'>
            <div onMouseEnter={mounseEntB1} onMouseLeave={mounseLeavB1} className="band-1">
                <div className="band-1-content">
                    <div>
                        <img src={"http://localhost:5000" + userInfo.picture} alt="profile" className="profile-pic"/>
                        <Link to='/profile'>Account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bands