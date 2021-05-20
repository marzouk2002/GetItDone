import React from 'react';
import Menu from './Menu';
import PropTypes from 'prop-types';

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

Header.protoTypes = {
    classes: PropTypes.string.isRequired
}

export default Header