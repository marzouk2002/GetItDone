import React from 'react'
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'

function ProjectsMenu() {

    const proMenuToggle = () => {
        document.querySelector('.control').classList.toggle('open')
    }

    return (
        <div className="projects-band">
            <div className="control">
                <div className="btn" onClick={proMenuToggle}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </div>
                <h4>projects</h4>
            </div>
            <div className="pro-container">
                <div className='pro-inner'>
                    <hr />
                    <div className='form-link'>
                        <div className="icon">
                            <FontAwesomeIcon icon={faPlus}/>
                        </div>
                        <h3>Add a Project</h3>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default ProjectsMenu