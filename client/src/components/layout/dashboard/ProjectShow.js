import React from 'react'
import parse from 'html-react-parser'

function ProjectShow ({ projectSelected }) {
    const { title, description, managers, developers } = projectSelected

    console.log(projectSelected)
    return (
        <div>
            <h1>{title}</h1>
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
                                        return (<li key={i} style={{marginLeft: '5px'}}>
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
                                        return (<li key={i} style={{marginLeft: '5px'}}>
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