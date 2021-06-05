import React, { useState } from 'react'
// redux
import { useSelector } from 'react-redux'
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

function Comments({ comments, projectId, setUpDate}) {
    const [ formInput, setFormInput] = useState('')
    const { _id } = useSelector(state => state.userInfo) 
    const token = localStorage.getItem('token')

    const handleInputChange = (e) => {
        setFormInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!formInput) return
        fetch('http://localhost:5000/app/comments', {
            method: 'POST',
            body: JSON.stringify({ formInput, projectId }),
            headers : { "Authorization": token, "Content-Type" : "application/json" }
        }).then(res => setUpDate(Math.random()*10000))
        .catch(err => console.log(err))
        setFormInput('')
    }

    const deleteComment = (commentId, projectId) => {
        fetch('http://localhost:5000/app/comments', {
            method: 'DELETE',
            body: JSON.stringify({ commentId, projectId }),
            headers : { "Authorization": token, "Content-Type" : "application/json" }
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
 
    return (
        <div className="comments-sec">
            <label>comments</label>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <input type="text" name="tasks" placeholder="Add a comment" value={formInput} onChange={handleInputChange}/>
                    <input className='btn primary' value="Add" type="submit"/>
                </div>
            </form>
            <div className="comments-cont">
                {
                    comments.map((comment, i) => (
                        <div key={i} className="comment">
                            <div className='image'>
                            { comment.picture ? <img src={'http://localhost:5000' + comment.picture} alt="profile" /> :
                            <FontAwesomeIcon className={`user-icon user-icon-small ${comment.role}`}  icon={faUserAlt}/>} 
                            </div>
                            <div>
                                <h4>{comment.userName}</h4>
                                <p>{comment.content}</p>
                            </div>
                            {
                                _id === comment.userId &&
                                <div className="delete-btn" title='delete comment' onClick={()=>deleteComment(comment.id, projectId)}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Comments