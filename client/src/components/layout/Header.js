import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const [classes, setClasses] = useState('')

    const location = useLocation()

    useEffect(() => {
        setClasses('')
        const { pathname } = location
        const altBar = ['/dashboard', '/server', '/about']
        if (altBar.includes(pathname)) setClasses('alt')

        if(pathname==="/about") setClasses('alt style2')

        if(pathname==="/dashboard") setClasses('dashboard')
    }, [location])

    const showMenu = (e) => {
        e.preventDefault()

        document.body.classList.add('is-menu-visible')
    }

    return (
        <header id="header" className={classes}>
            <Link to='/' className="logo"><strong>Get</strong> <span>It done</span></Link>
            <nav>
                <a onClick={showMenu} href="#menu">Menu</a>
            </nav>
        </header>
    )
}


export default Header