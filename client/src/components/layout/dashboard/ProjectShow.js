import React from 'react'
// html parser
import parse from 'html-react-parser'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// redux
import { useSelector } from 'react-redux'

function ProjectShow ({ projectSelected }) {
    const { title, description, managers, developers } = projectSelected

    const userInfo = useSelector(state => state.userInfo) 

    console.log(projectSelected)
    return (
        <div>
            <div className="project-header">
            <h1>{title}</h1>
            {
            userInfo.role === 'admin' && 
                <div className='detele-btn' title='delete this project'>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </div>
            }
            </div>
            
            <div className='project-wrap'>
                <div className='row'>
                    <div className='col-7 col-12-medium'>
                        <label>Description</label>
                        <div>
                            {parse(description)}
                        </div>
                    </div>
                    <div className='col-5 col-12-medium'>
                        <div className='seleceted-staff'>
                            {
                                managers.length &&  <div>
                                <label>Managers</label>
                                <ul>
                                {
                                    managers.map((mang, i) => {
                                        return (<li key={i} style={{marginLeft: '3px', paddingLeft:'0'}}>
                                            {mang.name}
                                        </li>)
                                    })
                                }
                                </ul>
                                </div>
                            }
                            {
                                developers.length &&  <div>
                                <label>Developers</label>
                                <ul>
                                {
                                    developers.map((dev, i) => {
                                        return (<li key={i} style={{marginLeft: '3px', paddingLeft:'0'}}>
                                            {dev.name}
                                        </li>)
                                    })
                                }
                                </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProjectShow