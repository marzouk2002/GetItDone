import React from 'react'
import parse from 'html-react-parser'

function ProjectShow ({ projectSelected}) {
    
    console.log(projectSelected)
    return (
        <div>
            <h1>{projectSelected.title}</h1>
            <div>{parse(projectSelected.description)}</div>
        </div>
    )
}
export default ProjectShow