import React from 'react'
// components
import BranchsForm from './BranchsForm'
// redux
import { useSelector } from 'react-redux'
// motion & fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

function Branchs({ branchs, projectId, setUpDate }) {
    const { role } = useSelector(state => state.userInfo)

    return (
        <div>
            <label>Branchs</label>
            {
                branchs.map((branch, i) => {
                    return (<div key={i} className="branch-card">
                        <h4>{branch.title}</h4>
                        <div className="delete-btn" title='delete branch'>
                            <FontAwesomeIcon icon={faTimes}/>
                        </div>
                    </div>)
                })
            }
            { role==='manager' && <BranchsForm projectId={projectId} setUpDate={setUpDate}/> }
        </div>
    )
}

export default Branchs