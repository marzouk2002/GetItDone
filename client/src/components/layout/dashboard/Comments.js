import React, { useState } from 'react'

function Comments() {
    const [ formInput, setFormInput] = useState('')

    const handleInputChange = (e) => {
        setFormInput(e.target.value)
    }
 
    return (
        <div className="comments-cont">
            <label>comments</label>
            <form>
                <div className="field">
                    <input type="text" name="tasks" placeholder="Add a comment" value={formInput} onChange={handleInputChange}/>
                    <input className='btn primary' value="Add" type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default Comments