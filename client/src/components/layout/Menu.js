import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import ProfileCard  from './ProfileCard'
// redux store 
import { useSelector, useDispatch } from 'react-redux'
import { setInfo, isLogged } from '../../actions'


function Menu() {

    const login = useSelector(state => state.login)
    const dispatch = useDispatch()

    const handleCloseMenu = (e) => {
        e.preventDefault()
        document.body.classList.remove('is-menu-visible')
    }

    const handleLogout = (e) => {
        localStorage.removeItem('token')
        dispatch(setInfo(false))
        dispatch(isLogged(false))
    }

    return (
        <nav id="menu" onClick={handleCloseMenu}>
            <div className="inner">
                <ul className="links">
                    <li><NavLink activeClassName='active-link' to="/" exact={true}>Home</NavLink></li>
                    <li><NavLink activeClassName='active-link' to="/about">About</NavLink></li>
                    <li><NavLink activeClassName='active-link' to="/contact">Contact us</NavLink></li>
                </ul>
                <ul className="actions stacked">
                    {
                    login ?  
                        <>
                            <li><ProfileCard /></li>
                            <li><Link to="/" onClick={handleLogout} className="button fit">Log Out</Link></li>
                        </> : 
                        <>
                            <li><Link to="/register" className="button primary fit">Get Started</Link></li>
                            <li><Link to="/login" className="button fit">Log In</Link></li>
                        </>
                    }
                </ul>
            </div>
            <a className="close" href="#menu">Close</a>
        </nav>
    )
}

export default Menu