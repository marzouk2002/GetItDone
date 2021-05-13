import React from 'react'
import { Link } from 'react-router-dom'
import Banner from './layout/Banner'
import Footer from './layout/Footer'
import Header from './layout/Header'
import Menu from './layout/Menu'

function Home() {
    return (
        <>
        {/* <!-- Header --> */}
            <Header classes="alt"/>

        {/* <!-- Menu --> */}
            <Menu/>

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

        {/* <!-- Footer --> */}
           <Footer/>
        </>
    )
}
export default Home