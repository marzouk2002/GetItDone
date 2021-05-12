import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer id="footer">
            <div className="inner">
                <ul className="icons">
                    <li><Link to="#" className="icon brands alt fa-twitter"><span className="label">Twitter</span></Link></li>
                    <li><Link to="#" className="icon brands alt fa-facebook-f"><span className="label">Facebook</span></Link></li>
                    <li><Link to="#" className="icon brands alt fa-instagram"><span className="label">Instagram</span></Link></li>
                    <li><Link to="#" className="icon brands alt fa-github"><span className="label">GitHub</span></Link></li>
                    <li><Link to="#" className="icon brands alt fa-linkedin-in"><span className="label">LinkedIn</span></Link></li>
                </ul>
                <ul className="copyright">
                    <li>&copy; Untitled</li><li>Design & Development : <a href="https://html5up.net" target="_blank">HTML5 UP</a> & <a href="https://github.com/marzouk2002" target="_blank">Youssouf MARZOUK</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer