import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import ProfileCard  from './ProfileCard'
// redux 
import { useSelector, useDispatch } from 'react-redux'
import { setInfo, isLogged } from '../../actions'


function Menu() {
    const login = useSelector(state => state.login)
    const dispatch = useDispatch()

    const logoutFunc = () => {
        dispatch(setInfo(false))
        dispatch(isLogged(false))
    }

    return (
        <nav id="menu">
            <ul className="links">
                <li><NavLink activeClassName='active-link' to="/" exact={true}>Home</NavLink></li>
                <li><NavLink activeClassName='active-link' to="/about">About</NavLink></li>
                <li><NavLink activeClassName='active-link' to="/contact">Contact us</NavLink></li>
            </ul>
            <ul className="actions stacked">
                {
                   login ?  
                    <>
                        <li><Link to="/" onClick={logoutFunc} className="button fit">Log Out</Link></li>
                        <li><Link to="/profile" className="button primary fit"><ProfileCard /></Link></li>
                    </> : 
                    <>
                        <li><Link to="/register" className="button primary fit">Get Started</Link></li>
                        <li><Link to="/login" className="button fit">Log In</Link></li>
                    </>

                    
                }
            </ul>
        </nav>
    )
}

export default Menu