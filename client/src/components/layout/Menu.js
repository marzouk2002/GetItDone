import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import ProfileCard  from './ProfileCard'
// redux 
import { useSelector } from 'react-redux'


function Menu() {

    const login = useSelector(state => state.login)

    const handleCloseMenu = (e) => {
        e.preventDefault()

        document.body.classList.remove('is-menu-visible')
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
                            <li><Link to="/" className="button fit">Log Out</Link></li>
                            <li><Link to="/profile" className="button primary fit"><ProfileCard /></Link></li>
                        </> : 
                        <>
                            <li><Link to="/register" className="button primary fit">Get Started</Link></li>
                            <li><Link to="/login" className="button fit">Log In</Link></li>
                        </>
                    }
                </ul>
            </div>
            <a class="close" href="#menu">Close</a>
        </nav>
    )
}

export default Menu