import React, { useEffect, useState } from 'react'
// redux
import { useSelector } from 'react-redux'
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faArrowLeft, faTimes, faUserAlt } from '@fortawesome/free-solid-svg-icons'
// socket.io
import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://localhost:5000");

function Texting() {
    const [ contacts, setContacts ] = useState([])
    const [ conversations, setConversations ] = useState([])
    const [ selctedConv, setSelectConv ] = useState(null)
    const [ selectedContact, setSelectCont ] = useState(null)
    const [ msgInpu, setMsgInpu ] = useState('')
    const {_id, serverId} = useSelector(state => state.userInfo)
    const textContainer = document.querySelector('.texting-cont')

    useEffect(() => {
        socket.emit('joinServer', {id: _id, serverId})

        socket.on("get-contacts", ({ newContacts }) => {
            setContacts(newContacts.filter(contact => contact._id!==_id))
        })

        socket.on('reseve-msg', data => console.log(data))
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

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('send-message', {sendTo: selectedContact._id, message: msgInpu})
        setMsgInpu('')
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
                                    {contact.online && <div className='online-dot'></div>}
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
                                    {selectedContact.online && <div className='online-dot'></div>}
                            </div>}
                        </header>
                        <main>

                        </main>
                        <form onSubmit={sendMessage}>
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
