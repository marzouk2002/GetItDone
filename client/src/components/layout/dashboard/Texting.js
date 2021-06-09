import React, { useEffect, useState } from 'react'
// redux
import { useSelector } from 'react-redux'
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faArrowLeft, faTimes, faUserAlt } from '@fortawesome/free-solid-svg-icons'

function Texting() {
    const [ contacts, setContacts ] = useState([])
    const [ selectedContact, setSelectCont ] = useState(null)
    const [ msgInpu, setMsgInpu ] = useState('')
    const userInfo = useSelector(state => state.userInfo)
    const token = localStorage.getItem('token')
    const textContainer = document.querySelector('.texting-cont')

    useEffect(() => {
        fetch("http://localhost:5000/app/contacts", {
            method: 'GET',
            headers : { "Authorization": token }
        })
        .then(res => res.json())
        .then(data => setContacts(data.contacts))
        .catch(err => console.error(err))
    }, [])

    const handleChange = (e) => {
        setMsgInpu(e.target.value)
    }

    const openConv = (index) => {
        document.querySelector('.conversation').classList.add('open')
        setSelectCont(contacts[index])
    }

    const closeConv = () => {
        document.querySelector('.conversation').classList.remove('open')
    }

    return (
        <div className='texting'>
            <div className='btn' onClick={()=>{textContainer.classList.remove('close')}} title='Messages'>
                <FontAwesomeIcon icon={faComments} />
            </div>
            <div className="texting-cont close">
                <header>
                    <div className='btn' onClick={()=>{textContainer.classList.add('close')}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <h2>Messages</h2>
                </header>
                <main>
                    <div className="contacts">
                        {
                            contacts.map((contact, i) => (
                                <div key={i} className="contact" onClick={() =>openConv(i)}>
                                    { contact.picture ? <img src={'http://localhost:5000' + contact.picture} alt="profile" /> :
                                    <FontAwesomeIcon className={`user-icon user-icon-small ${contact.role}`}  icon={faUserAlt}/>} 
                                    <h4>{contact.name}</h4>
                                </div>
                            ))
                        }
                    </div>
                    <div className="conversation">
                        <header>
                            <div className='btn' onClick={closeConv}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </div>
                            {selectedContact && <div className='target-info'>
                                { selectedContact.picture ? <img src={'http://localhost:5000' + selectedContact.picture} alt="profile" /> :
                                    <FontAwesomeIcon className={`user-icon user-icon-small ${selectedContact.role}`}  icon={faUserAlt}/>} 
                                    <h4>{selectedContact.name}</h4>
                            </div>}
                        </header>
                        <main>

                        </main>
                        <form>
                            <input type="text" name='message' autoComplete='off' value={msgInpu} onChange={handleChange}/>
                            <input type="submit" value='Send' className='button primary'/>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Texting
