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
    const token = localStorage.getItem('token')

    const deleteBranch = (branchId) => {
        fetch('http://localhost:5000/app/branchs', {
            method: 'DELETE',
            body: JSON.stringify({ branchId, projectId }),
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
                    <div key={i} className="branch-card">
                        <h4>{branch.title}</h4>
                        { role!=='developer' && <div className="delete-btn" title='delete branch' onClick={()=>deleteBranch(branch.id)}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </div>}
                    </div>
                    )
                })
            }
            </div>
            { role==='manager' && <BranchsForm projectId={projectId} setUpDate={setUpDate}/> }
        </div>
    )
}

export default Branchs