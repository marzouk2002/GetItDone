import React, { useState } from 'react'
// redux
import { useSelector } from 'react-redux'

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
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
        setFormInput('')
    }
 
    return (
        <div className="comments-cont">
            <label>comments</label>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <input type="text" name="tasks" placeholder="Add a comment" value={formInput} onChange={handleInputChange}/>
                    <input className='btn primary' value="Add" type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default Comments