import React from 'react'
// components
import BranchsForm from './BranchsForm'
// redux
import { useSelector } from 'react-redux'
// motion & fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
// html parser
import parse from 'html-react-parser'

function Branchs({ branchs, projectId, setUpDate }) {
    const { role } = useSelector(state => state.userInfo)
    const token = localStorage.getItem('token')

    const deleteBranch = (branchId) => {
        fetch('http://localhost:5000/app/branchs', {
            method: 'DELETE',
            body: JSON.stringify({ branchId, projectId }),
            headers : { "Authorization": token, "Content-Type" : "application/json" }
        }).then(res => setUpDate(Math.random() * 10000))
        .catch(err => console.error(err))
    }

    const handleCheckTask = (index, branchId) => {
        fetch('http://localhost:5000/app/branchs', {
            method: 'PUT',
            body: JSON.stringify({ branchId, projectId, index }),
            headers : { "Authorization": token, "Content-Type" : "application/json" }
        }).then(res => setUpDate(Math.random() * 10000))
        .catch(err => console.error(err))
    }

    return (
        <div className="branchs">
            <label>Branchs</label>
            <div className="branch-container">
            {
                branchs.map((branch, i) => {
                    return (
                    <motion.div layout key={i} className="branch-card">
                        <h4>{branch.title}</h4>
                        { role!=='developer' && <div className="delete-btn" title='delete branch' onClick={()=>deleteBranch(branch.id)}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </div>}
                        <div>
                            {parse(branch.description)}
                        </div>
                        <div className='progress'>
                        <motion.div 
                        initial={{scaleX: 0}}
                        animate={{scaleX: branch.completion/100}}
                        transition={{delay: 0.8 + 0.15*i, duration: 0.8}}
                        className={branch.completion<25 ? 'red' : branch.completion<70 ? 'yellow' : 'green'}
                        ></motion.div>
                        </div>
                        <div style={{textAlign: 'center'}}><p>{branch.completion}%</p></div>
                        <div>
                                {
                                    branch.tasks.map((task, i) => (<div id="task" key={i}>
                                    <input type="checkbox"  className={task.status ? 'done' : ''} onClick={()=>{handleCheckTask(i, branch.id)}}/>
                                    <label>
                                        <span id="custom-checkbox"></span>
                                        {task.task}
                                    </label>
                                    </div>))
                                }
                        </div>
                    </motion.div>
                    )
                })
            }
            </div>
            { role==='manager' && <BranchsForm projectId={projectId} setUpDate={setUpDate}/> }
        </div>
    )
}

export default Branchs