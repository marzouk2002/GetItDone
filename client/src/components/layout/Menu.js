import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Menu() {
    return (
        <nav id="menu">
            <ul className="links">
                <li><NavLink activeStyle={active_style} to="/" exact={true}>Home</NavLink></li>
                <li><NavLink activeStyle={active_style} to="/about">About</NavLink></li>
                <li><NavLink activeStyle={active_style} to="/contact">Contact us</NavLink></li>
            </ul>
            <ul className="actions stacked">
                <li><Link to="/register" className="button primary fit">Get Started</Link></li>
                <li><Link to="/login" className="button fit">Log In</Link></li>
            </ul>
        </nav>
    )
}
    
const active_style = {
    fontSize : '1.1rem',
    color: '#53e3fb'
}

export default Menu