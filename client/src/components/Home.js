import React from 'react'
import { Link } from 'react-router-dom'
import Banner from './layout/Banner'
import Footer from './layout/Footer'
import Header from './layout/Header'

function Home() {
    return (
        <>
        {/* <!-- Header --> */}
            <Header classes="alt"/>

        {/* <!-- Banner --> */}
            <Banner status={true}/>

        {/* <!-- Main --> */}
        <div id="main">

            {/* <!-- One --> */}
                <section id="one" className="tiles">
                    <article>
                        <span className="image">
                            <img src="images/pic01.jpg" alt="" />
                        </span>
                        <header className="major">
                            <h3><Link to="/about" className="link">Goals</Link></h3>
                            <p>Set goals and track Progress</p>
                        </header>
                    </article>
                    <article>
                        <span className="image">
                            <img src="images/pic02.jpg" alt="" />
                        </span>
                        <header className="major">
                            <h3><Link to="/about" className="link">Managment</Link></h3>
                            <p>manage all of your projects from one place</p>
                        </header>
                    </article>
                    <article>
                        <span className="image">
                            <img src="images/pic03.jpg" alt="" />
                        </span>
                        <header className="major">
                            <h3><Link to="/about" className="link">Comments & Chats</Link></h3>
                            <p>communicate and add comments in real-time.</p>
                        </header>
                    </article>
                    <article>
                        <span className="image">
                            <img src="images/pic04.jpg" alt="" />
                        </span>
                        <header className="major">
                            <h3><Link to="/about" className="link">Docs</Link></h3>
                            <p>organize all documents needed</p>
                        </header>
                    </article>
                </section>

            {/* <!-- Two --> */}
                <section id="two">
                    <div className="inner">
                        <header>
                            <h2 style={{marginBottom: '1rem'}}>About</h2>
                        </header>
                        <p style={{marginBottom: '1rem'}}>Get It Done is a project management system. Its goal is to help teams getting work done as fast and effectively as possible. And it does that by letting each member know what he should do and when to do it. By giving employers and project managers the ability to assign tasks to developers and track their progress.</p>
                        <ul className="actions">
                            <li><a href="/about" className="button primary">Reade More</a></li>
                            <li><a href="/register" className="button next">Get Started</a></li>
                        </ul>
                    </div>
                </section>

        </div>

        {/* <!-- Footer --> */}
           <Footer/>
        </>
    )
}
export default Home