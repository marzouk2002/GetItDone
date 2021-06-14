import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Footer from './layout/Footer'

function About() {

    const topOfPage = useRef(null)

    const scrollToBottom = () => {
      topOfPage.current.scrollIntoView(true)
    }

    useEffect(scrollToBottom, []);

    return (
        <>
            <div ref={topOfPage} />
            <section id="banner" className="style2">
                <div className="inner">
                    <span className="image">
                        <img src="images/pic07.jpg" alt="" />
                    </span>
                    <header className="major">
                        <h1>About</h1>
                    </header>
                    <div className="content">
                        <p>here we talk about get it done<br />
                        Its features, what it does, and how it works.</p>
                    </div>
                </div>
            </section>
            <div id="main">
                <section id="one">
                    <div className="inner">
                        <header className="major">
                            <h2>What is Get It Done?</h2>
                        </header>
                        <p>Get It Done is a project management system. Its goal is to help teams getting work done as fast and effectively as possible. And it does that by letting each member know what he should do and when to do it. By giving employers and project managers the ability to assign tasks to developers and track their progress.</p>
                    </div>
                </section>

                <section id="two" className="spotlights">
                    <section>
                        <a href="generic.html" className="image">
                            <img src="images/pic08.jpg" alt="" data-position="center center" />
                        </a>
                        <div className="content">
                            <div className="inner">
                                <header className="major">
                                    <h3>Orci maecenas</h3>
                                </header>
                                <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis tempus.</p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <a href="generic.html" className="image">
                            <img src="images/pic09.jpg" alt="" data-position="top center" />
                        </a>
                        <div className="content">
                            <div className="inner">
                                <header className="major">
                                    <h3>Rhoncus magna</h3>
                                </header>
                                <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis tempus.</p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <a href="generic.html" className="image">
                            <img src="images/pic10.jpg" alt="" data-position="25% 25%" />
                        </a>
                        <div className="content">
                            <div className="inner">
                                <header className="major">
                                    <h3>Sed nunc ligula</h3>
                                </header>
                                <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis tempus.</p>
                            </div>
                        </div>
                    </section>
                </section>

                <section id="three">
                    <div class="inner center_stuf">
                        <Link to="/register" class="button primary">Get Started</Link>
                    </div>
                </section>
			</div>
            <Footer/>
        </>
    )
}

export default About