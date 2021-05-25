import React from 'react'
import { Link } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo, isLogged, setServerInfo } from '../../actions'
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faServer, faPowerOff } from '@fortawesome/free-solid-svg-icons'

function Bands() {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo)

    const mounseEntB1 = () => {
        document.querySelector('.main').classList.add("open-band-1")
    }

    const mounseLeavB1 = () => {
        document.querySelector('.main').classList.remove("open-band-1")
    }

    const handleLogout = (e) => {
        localStorage.removeItem('token')
        dispatch(setUserInfo(false))
        dispatch(isLogged(false))
        dispatch(setServerInfo(false))
    }

    return (
        <div className='band-wrapper'>
            <div onMouseEnter={mounseEntB1} onMouseLeave={mounseLeavB1} className="band-1">
                <div className="band-1-content">
                    <div>
                        <img src={"http://localhost:5000" + userInfo.picture} alt="profile" className="profile-pic"/>
                        <Link to='/profile'>Account</Link>
                    </div>
                    {
                        userInfo.role === 'admin' &&
                        <div>
                            <FontAwesomeIcon className={`user-icon user-icon-small`}  icon={faServer}/>
                            <Link to='/server'>Server</Link>
                        </div>
                    }
                    <div>
                        <FontAwesomeIcon className={`user-icon user-icon-small`}  icon={faPowerOff}/>
                        <Link to='/' onClick={handleLogout}>Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bands