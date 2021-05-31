import React from 'react'

function About() {
    return (
        <React.Fragment>
            <main>
                <header className="major" style={titleStyle}>
                        <h1>About</h1>
                </header>
            </main>
        </React.Fragment>
    )
}

const titleStyle = {
    margin: '5vmin auto',
    textAlign: 'center'
}

export default About