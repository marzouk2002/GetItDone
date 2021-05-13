import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
    return (
        <nav id="menu">
            <ul className="links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
            </ul>
            <ul className="actions stacked">
                <li><Link to="/register" className="button primary fit">Get Started</Link></li>
                <li><Link to="/login" className="button fit">Log In</Link></li>
            </ul>
        </nav>
    )
}

export default Menu