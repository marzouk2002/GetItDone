import React from 'react';
import Menu from './Menu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ classes }) {
    return (
        <>
            <header id="header" className={classes}>
                <Link to='/' className="logo"><strong>Get</strong> <span>It done</span></Link>
                <nav>
                    <a href="#menu">Menu</a>
                </nav>
            </header>
            <Menu/>
        </>
    )
}

Header.protoTypes = {
    classes: PropTypes.string.isRequired
}

export default Header