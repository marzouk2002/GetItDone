import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header id="header" className="alt">
            <Link to="/" className="logo"><strong>Forty</strong> <span>by HTML5 UP</span></Link>
            <nav>
                <a href="#menu">Menu</a>
            </nav>
        </header>
    )
}

export default Header