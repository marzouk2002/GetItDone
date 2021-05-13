import React from 'react'
import { Link } from 'react-router-dom'

function Header({ classes }) {
    return (
        <header id="header" className={classes}>
            <Link to="/" className="logo"><strong>Get</strong> <span>It done</span></Link>
            <nav>
                <a href="#menu">Menu</a>
            </nav>
        </header>
    )
}

export default Header