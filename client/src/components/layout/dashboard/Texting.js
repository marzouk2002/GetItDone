import React, { useEffect, useState, useRef } from 'react'
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
    const [ selectedId, setSelectedId ] = useState("")
    const [ targetContact, setTargetCont ] = useState(null)
    const [ targetConv, setTargetConv ] = useState(null)
    const [ msgInpu, setMsgInpu ] = useState('')
    const [ isTextOpen, setTextOpen ] = useState(false)
    const [ unReadCount, setunReadCount ] = useState(1) 
    const {_id, serverId} = useSelector(state => state.userInfo)
    const textContainer = document.querySelector('.texting-cont')

    useEffect(() => {
        socket.emit('joinServer', {id: _id, serverId})
        socket.emit('req-conv', {id: _id, serverId})

        socket.on("get-contacts", ({ newContacts }) => {
            setContacts(newContacts.filter(contact => contact._id!==_id))
        })

        socket.on("get-conv", ({ conversations}) => setConversations(conversations))

        socket.on('reseve-msg', ({ message }) => {
            console.log(message)
        })
    }, [])

    useEffect(() => {
        setTargetCont(contacts.find(contact => contact._id === selectedId))
        setTargetConv(conversations.find(contact => contact.targetId === selectedId))
    }, [ selectedId, conversations, contacts ])
    
    const handleChange = (e) => {
        setMsgInpu(e.target.value)
    }

    const openTexting = () => {
        textContainer.classList.remove('close')
        setTextOpen(true)
    }

    const closeTexting = () => {
        textContainer.classList.add('close')
        setTextOpen(false)
    }

    const openConv = (id) => {
        document.querySelector('.conversation').classList.add('open')
        setSelectedId(id)
    }

    const closeConv = () => {
        document.querySelector('.conversation').classList.remove('open')
        setSelectedId('')
    }

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('send-message', {serverId, sentFrom: _id, sentTo: selectedId, message: msgInpu})
        setMsgInpu('')
        e.target.elements.message.focus()
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView(true)
    }

    useEffect(scrollToBottom, [targetConv]);

    return (
        <div className='texting'>
            <div className='btn' onClick={openTexting} title='Messages'>
                <FontAwesomeIcon icon={faComments} />
                { unReadCount>0 ?  <div className="unread-notif">{unReadCount}</div> : "" }
            </div>
            <div className="texting-cont close">
                <header>
                    <div className='btn' onClick={closeTexting}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <h2>Messages</h2>
                </header>
                <main>
                    <div className="contacts">
                        {
                            contacts.map((contact, i) => (
                                <div key={i} className="contact" onClick={() =>openConv(contact._id)}>
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
                            {targetContact && <div className='target-info'>
                                { targetContact.picture ? <img src={'http://localhost:5000' + targetContact.picture} alt="profile" /> :
                                    <FontAwesomeIcon className={`user-icon user-icon-small ${targetContact.role}`}  icon={faUserAlt}/>} 
                                    <h4>{targetContact.name}</h4>
                                    {targetContact.online && <div className='online-dot'></div>}
                            </div>}
                        </header>
                        <main>
                            { targetConv && targetConv?.chat.map((msg, i) => (<div key={i} className={msg.userId===_id ? "msg mine" : "msg"}>
                                <div>
                                    <p>{msg.text}</p>
                                    <span>{msg.date}</span>
                                </div>
                            </div>))}
                            <div ref={messagesEndRef} />
                        </main>
                        <form onSubmit={sendMessage}>
                            <input type="text" id="message" name='message' autoComplete='off' value={msgInpu} onChange={handleChange}/>
                            <input type="submit" value='Send' className='button primary'/>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Texting
