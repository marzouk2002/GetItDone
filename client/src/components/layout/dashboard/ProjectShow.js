import React from 'react'
// html parser
import parse from 'html-react-parser'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// redux
import { useSelector } from 'react-redux'
// components
import DisplayFiles from './DispalyFiles'
import Branchs from './Branchs';
import Comments from './Comments';
// animation
import { motion } from 'framer-motion'
import AnimatedNumber from "animated-number-react";

function ProjectShow ({ projectSelected, setIndex, selectedIndex, setUpDate }) {
    const { title, description, managers, developers, files, _id, completion, branchs, comments } = projectSelected
    const { role } = useSelector(state => state.userInfo) 

    console.log(projectSelected)

    const token = localStorage.getItem('token')

    const deletePro = (e) => {
        const id = projectSelected._id
        fetch('http://localhost:5000/app/deletepro?pro_id='+id, {
            method: 'DELETE',
            headers : { Authorization: token }
        }).then(res => {
            setUpDate(Math.random()*10000)
            setIndex(selectedIndex ? selectedIndex-1 : selectedIndex)
        })
        .catch(err => console.log(err))
    }
    return (
        <>
            <div className="project-header">
            <h1>{title}</h1>
            {
            role === 'admin' && 
                <div className='detele-btn' title='delete this project' onClick={deletePro}>
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
                                managers.length ? <div>
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
                                </div> : ''
                            }
                            {
                                developers.length ? <div>
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
                                </div> : ''
                            }
                        </div>
                    </div>
                </div>
                <DisplayFiles files={files} projectId={_id} setUpDate={setUpDate}/>
                <div className="completion">
                    <label>Completion</label>
                    <div className='progress'>
                        <motion.div 
                        initial={{scaleX: 0}}
                        animate={{scaleX: completion/100}}
                        transition={{ duration:1 }}
                        className={completion<25 ? 'red' : completion<70 ? 'yellow' : 'green'}
                        ></motion.div>
                    </div>
                    <div><p>
                        <AnimatedNumber
                        value={completion}
                        formatValue={value => Math.round(value)}
                        duration={1000}/>%
                    </p></div>
                </div>
                <Branchs projectId={_id} setUpDate={setUpDate} branchs={branchs}/>
                <Comments comments={comments} projectId={_id} setUpDate={setUpDate}/>
            </div>
        </>
    )
}
export default ProjectShow