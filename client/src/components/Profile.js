import React from 'react'
import { Redirect } from 'react-router'
// redux
import { useSelector } from 'react-redux'

 function Profile() {
    const userInfo = useSelector(state => state.userInfo)

    return (
        <main>
            { !userInfo && <Redirect to={{pathname: "/login", state: {msgs:[{text: 'Sorry you should logged in to access that page',type:"danger" }]}}} /> }
            <header className="major" style={titleStyle}>
                    <h1>Profile</h1>
            </header>
            <section className="inner">
                <div className="row">
                    <div className="col-5 col-12-small profile-pic">
                        <img src={'http://localhost:5000'+userInfo.picture} alt="user profile pic" />
                    </div>
                    <div className="col-7 col-12-small">
                        <h4>Name:</h4>
                        <p>{userInfo.name}</p>
                        <h4>Email:</h4>
                        <p>{userInfo.email}</p>
                        <h4>Role:</h4>
                        <p>{userInfo.role}</p>
                        <h4>Server Id:</h4>
                        <p>{userInfo.serverId}</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
const titleStyle = {
    margin: '5vmin auto',
    textAlign: 'center'
}

export default Profile