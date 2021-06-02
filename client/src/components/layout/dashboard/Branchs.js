import React from 'react'
// components
import BranchsForm from './BranchsForm'
// redux
import { useSelector } from 'react-redux'

function Branchs() {
    const { role } = useSelector(state => state.userInfo)

    return (
        <div>
            <label>Branchs</label>
            { role==='manager' && <BranchsForm/> }
        </div>
    )
}

export default Branchs