import React from 'react'
//components 
import ProjectForm from './ProjectForm'

export default function Main({ projects ,selectedIndex }) {
    return (
        <div className="major pro-main">
            {
                projects[selectedIndex] ? <h1>{projects[selectedIndex].title}</h1> : <ProjectForm/>
            }
        </div>
    )
}
