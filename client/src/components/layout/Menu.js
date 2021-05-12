import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
    return (
        <nav id="menu">
            <ul className="links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="landing.html">Landing</Link></li>
                <li><Link to="generic.html">Generic</Link></li>
                <li><Link to="elements.html">Elements</Link></li>
            </ul>
            <ul className="actions stacked">
                <li><Link to="#" className="button primary fit">Get Started</Link></li>
                <li><Link to="#" className="button fit">Log In</Link></li>
            </ul>
        </nav>
    )
}

export default Menu