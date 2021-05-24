import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const [isAlt, setAlt] = useState(true)

    const location = useLocation()

    useEffect(() => {
        const altBar = ['/dashboard', '/server']
        if(altBar.includes(location.pathname)) {
            setAlt(false)
        } else {
            setAlt(true)
        }
    }, [location])

    const showMenu = (e) => {
        e.preventDefault()

        document.body.classList.add('is-menu-visible')
    }

    return (
        <header id="header" className= { isAlt ? 'alt' : ''}>
            <Link to='/' className="logo"><strong>Get</strong> <span>It done</span></Link>
            <nav>
                <a onClick={showMenu} href="#menu">Menu</a>
            </nav>
        </header>
    )
}


export default Header