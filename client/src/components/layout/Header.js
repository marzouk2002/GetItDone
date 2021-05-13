import React from 'react'
import { Link } from 'react-router-dom'

function Header({ classes }) {
    return (
        <header id="header" className={classes}>
            <p className="logo"><strong>Get</strong> <span>It done</span></p>
            <nav>
                <a href="#menu">Menu</a>
            </nav>
        </header>
    )
}

export default Header