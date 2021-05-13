import React from 'react'
import Menu from './Menu'

function Header({ classes }) {
    return (
        <>
            <header id="header" className={classes}>
                <a href='/' className="logo"><strong>Get</strong> <span>It done</span></a>
                <nav>
                    <a href="#menu">Menu</a>
                </nav>
            </header>
            <Menu/>
        </>
    )
}

export default Header