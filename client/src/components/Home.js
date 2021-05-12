import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './layout/Footer'
import Header from './layout/Header'
import Menu from './layout/Menu'

function Home() {
    return (
        <>
        {/* <!-- Header --> */}
            <Header/>

        {/* <!-- Menu --> */}
            <Menu/>

        {/* <!-- Banner --> */}
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

        {/* <!-- Main --> */}
            <div id="main">

                {/* <!-- One --> */}
                    <section id="one" className="tiles">
                        <article>
                            <span className="image">
                                <img src="images/pic01.jpg" alt="" />
                            </span>
                            <header className="major">
                                <h3><Link to="landing.html" className="link">Aliquam</Link></h3>
                                <p>Ipsum dolor sit amet</p>
                            </header>
                        </article>
                        <article>
                            <span className="image">
                                <img src="images/pic02.jpg" alt="" />
                            </span>
                            <header className="major">
                                <h3><Link to="landing.html" className="link">Tempus</Link></h3>
                                <p>feugiat amet tempus</p>
                            </header>
                        </article>
                        <article>
                            <span className="image">
                                <img src="images/pic03.jpg" alt="" />
                            </span>
                            <header className="major">
                                <h3><Link to="landing.html" className="link">Magna</Link></h3>
                                <p>Lorem etiam nullam</p>
                            </header>
                        </article>
                        <article>
                            <span className="image">
                                <img src="images/pic04.jpg" alt="" />
                            </span>
                            <header className="major">
                                <h3><Link to="landing.html" className="link">Ipsum</Link></h3>
                                <p>Nisl sed aliquam</p>
                            </header>
                        </article>
                        <article>
                            <span className="image">
                                <img src="images/pic05.jpg" alt="" />
                            </span>
                            <header className="major">
                                <h3><Link to="landing.html" className="link">Consequat</Link></h3>
                                <p>Ipsum dolor sit amet</p>
                            </header>
                        </article>
                        <article>
                            <span className="image">
                                <img src="images/pic06.jpg" alt="" />
                            </span>
                            <header className="major">
                                <h3><Link to="landing.html" className="link">Etiam</Link></h3>
                                <p>Feugiat amet tempus</p>
                            </header>
                        </article>
                    </section>

                {/* <!-- Two --> */}
                    <section id="two">
                        <div className="inner">
                            <header className="major">
                                <h2>Massa libero</h2>
                            </header>
                            <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
                            <ul className="actions">
                                <li><Link to="landing.html" className="button next">Get Started</Link></li>
                            </ul>
                        </div>
                    </section>

            </div>

        {/* <!-- Contact --> */}
            <section id="contact">
                <div className="inner">
                    <section>
                        <form method="post" action="#">
                            <div className="fields">
                                <div className="field half">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" />
                                </div>
                                <div className="field half">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" id="email" />
                                </div>
                                <div className="field">
                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" id="message" rows="6"></textarea>
                                </div>
                            </div>
                            <ul className="actions">
                                <li><input type="submit" value="Send Message" className="primary" /></li>
                                <li><input type="reset" value="Clear" /></li>
                            </ul>
                        </form>
                    </section>
                    <section className="split">
                        <section>
                            <div className="contact-method">
                                <span className="icon solid alt fa-envelope"></span>
                                <h3>Email</h3>
                                <Link to="#">information@untitled.tld</Link>
                            </div>
                        </section>
                        <section>
                            <div className="contact-method">
                                <span className="icon solid alt fa-phone"></span>
                                <h3>Phone</h3>
                                <span>(000) 000-0000 x12387</span>
                            </div>
                        </section>
                        <section>
                            <div className="contact-method">
                                <span className="icon solid alt fa-home"></span>
                                <h3>Address</h3>
                                <span>1234 Somewhere Road #5432<br />
                                Nashville, TN 00000<br />
                                United States of America</span>
                            </div>
                        </section>
                    </section>
                </div>
            </section>

        {/* <!-- Footer --> */}
           <Footer/>
        </>
    )
}
export default Home