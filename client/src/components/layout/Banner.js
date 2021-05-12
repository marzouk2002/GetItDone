import React from 'react'
import { Link } from 'react-router-dom'

function Banner({ status }) {
    return status ? (
        <section id="banner" className="major">
            <div className="inner">
                <header className="major">
                    <h1>Hi, my name is Forty</h1>
                </header>
                <div className="content">
                    <p>A responsive site template designed by HTML5 UP<br />
                    and released under the Creative Commons.</p>
                    <ul className="actions">
                        <li><Link to="#one" className="button next scrolly">Get Started</Link></li>
                    </ul>
                </div>
            </div>
        </section>
    ) : (
        <section id="banner" className="major">
            <div className="inner">
                <header className="major">
                    <h1>Hi, my name is Forty</h1>
                </header>
                <div className="content">
                    <p>A responsive site template designed by HTML5 UP<br />
                    and released under the Creative Commons.</p>
                    <ul className="actions">
                        <li><Link to="#one" className="button next scrolly">Get Started</Link></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Banner