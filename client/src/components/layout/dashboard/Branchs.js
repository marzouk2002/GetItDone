import React from 'react'
// components
import BranchsForm from './BranchsForm'
// redux
import { useSelector } from 'react-redux'

function Branchs({ branchs, projectId, setUpDate }) {
    const { role } = useSelector(state => state.userInfo)

    return (
        <div>
            <label>Branchs</label>
            { role==='manager' && <BranchsForm projectId={projectId} setUpDate={setUpDate}/> }
        </div>
    )
}

export default Branchs