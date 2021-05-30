import React, { useState } from 'react'
//components 
import ProjectForm from './ProjectForm'
import Loading from '../Loading'

export default function Main({ projects, selectedIndex, setProjects }) {
    const projectSelect = projects[selectedIndex]
    const [loading, setLoading] = useState(false)
    return (
        <div className="major pro-main">
            {
                projectSelect ? <><h1>{projectSelect.title}</h1><h4>{projectSelect.description}</h4> </>
                : <ProjectForm  projects={projects} setProjects={setProjects}/>
            }
            {loading && <Loading/>}
        </div>
    )
}
