import React from 'react'

function ProjectForm() {
    return (
        <div>
            <h1>Start a Project</h1>
            <div style={{width: '80%', marginLeft: '5%'}}>
                <form>
                    <div className="field">
                        <label htmlFor="name">Title</label>
                        <input type="text" name="name" required/>
                    </div> 
                    <div className="row">

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectForm
