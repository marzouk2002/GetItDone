import React, { useState } from 'react'
//components 
import ProjectForm from './ProjectForm'
import Loading from '../Loading'
import ProjectShow from './ProjectShow'

export default function Main({ projects, selectedIndex, setProjects }) {
    const projectSelected = projects[selectedIndex]
    const [loading, setLoading] = useState(false)

    return (
        <div className="major pro-main">
            {
                projectSelected ? <ProjectShow projectSelected={projectSelected}/>
                : <ProjectForm  projects={projects} setProjects={setProjects}  setLoading={setLoading}/>
            }
            {loading && <Loading/>}
        </div>
    )
}
