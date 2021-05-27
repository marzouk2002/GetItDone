import React from 'react'
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'
// redux
import { useSelector } from 'react-redux'
function ProjectsMenu({ projects, setIndex }) {
    // store
    const role = useSelector(state => state.userInfo.role)

    const proMenuToggle = () => {
        document.querySelector('.control').classList.toggle('open')
    }

    const  handleClick= (i) => {
        setIndex(i)
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
                    {
                        projects && projects.map((pro, i) => (
                            <><div className='pro-link' key={pro._id} onClick={()=>handleClick(i)}>
                                <div className='pro-link-prog'>
                                    <svg>
                                        <circle cx='20' cy='20' r='20' className={pro.completion<25 ? 'red' : pro.completion<70 ? 'yellow' : 'green'}
                                        style={{strokeDashoffset: 125 - (125 * pro.completion) / 100  }}/>
                                    </svg>
                                    <div className='number'>
                                        <h4>{pro.completion}<span>%</span></h4>
                                    </div>
                                </div>
                                <h3>{pro.title}</h3>
                            </div>
                            <hr/></>
                        ))
                    }
                    { role === 'admin' &&
                        <><div className='form-link' onClick={()=>handleClick(projects.length)}>
                            <div className="icon">
                                <FontAwesomeIcon icon={faPlus}/>
                            </div>
                            <h3>Add a Project</h3>
                        </div>
                        <hr/></>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectsMenu