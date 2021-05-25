import React from 'react'
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function ProjectsMenu() {

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
            <div className="pro-container"></div>
        </div>
    )
}
