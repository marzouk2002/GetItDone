import React from 'react'
//components 
import ProjectForm from './ProjectForm'

export default function Main({ projects ,selectedIndex }) {
    const projectSelect = projects[selectedIndex]

    return (
        <div className="major pro-main">
            {
                projectSelect ? <><h1>{projectSelect.title}</h1><h4>{projectSelect.description}</h4> </>
                : <ProjectForm/>
            }
        </div>
    )
}
