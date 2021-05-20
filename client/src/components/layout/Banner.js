import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Banner({ status }) {
    return status ? (
        <section id="banner" className="major">
            <div className="inner">
                <header className="major">
                    <h1>Hi, my name is Get It Done</h1>
                </header>
                <div className="content">
                    <p>The one and all productivenis platform.</p>
                    <ul className="actions">
                        <li><Link to="/register" className="button next scrolly">Get Started</Link></li>
                    </ul>
                </div>
            </div>
        </section>
    ) : (
        <section id="banner" className="major">
            <div className="inner">
                <header className="major">
                    <h1>Error 404!</h1>
                </header>
                <div className="content">
                    <p>Sorry, page not found.</p>
                </div>
            </div>
        </section>
    )
}

Banner.protoTypes = {
    status: PropTypes.bool.isRequired
}

export default Banner