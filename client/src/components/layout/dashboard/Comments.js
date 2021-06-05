import React from 'react'

function Comments() {
    return (
        <div className="comments-cont">
            <label>comments</label>
            <form>
                <div className="field">
                    <input type="text" name="tasks" placeholder="Add a comment" style={{flex:'100% 1 1'}}/>
                    <input className='btn primary' value="Add" type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default Comments