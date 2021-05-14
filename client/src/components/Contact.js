import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './layout/Footer'
import Header from './layout/Header'
import emailjs from 'emailjs-com';

// initialise emailjs
emailjs.init("user_5nTxtNAdZq42NuLR5cyjP")

function Contact() {
    const [state, setState] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        })
    }

    const sendFeedback = (serviceID, templateId, variables) => {
        emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
    }
    

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, message} = state

        alert(`Thank you ${name} for your message from ${email}`);
        const templateId = 'get_it_done_template';
        const serviceID = 'my_gmail';
        sendFeedback(serviceID, templateId, { from_name: name, message, from_email: email, to_name: 'youssouf' })
    }

    return (
        <>
            <Header classes='alt'/>
            <header className="major" style={titleStyle}>
                <h1>Reach out to us</h1>
            </header>
            <section id="contact">
                <div className="inner">
                    <section>
                        <form onSubmit={handleSubmit}>
                            <div className="fields">
                                <div className="field half">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" value={state.name} onChange={handleChange} required/>
                                </div>
                                <div className="field half">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" value={state.email} onChange={handleChange} required/>
                                </div>
                                <div className="field">
                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" rows="6" value={state.message} onChange={handleChange} required></textarea>
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
            <Footer/>
        </>
    )
}

const titleStyle = {
    margin: '5vmin auto',
    textAlign: 'center'
}

export default Contact