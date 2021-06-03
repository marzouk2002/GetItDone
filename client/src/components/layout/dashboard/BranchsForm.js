import React, { useState } from 'react'
// CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// components
import  Alert from '../Alert'

function BranchsForm({ projectId, setUpDate }) {
    const [ newTask, setNewTask ] = useState('')
    const [ tasksArr, setTaskArr ] = useState([])
    const [msgs, setMsgs] = useState([])
    const [ formState, setFormState ] = useState({
        title: '',
        description: ''
    })

    const deleteMsg = (target) => {
        setMsgs(msgs.filter((msg, index)=>index!==target))
    }

    const handleTextChange = (event, editor) => {
        if(editor) {
            const data = editor.getData()
            setFormState({...formState, description: data})
        } else {
            const data = event.target.value
            setFormState({...formState, title: data})
        }
    }

    const handleNewTask = (e) => {
        setNewTask(e.target.value)
    } 

    const addTask = (e) => {
        e.preventDefault()
        setTaskArr(newTask ? [...tasksArr, newTask] : [...tasksArr])
        setNewTask('')
    }

    const resetBtn = () => {
        setTaskArr([])
        setNewTask('')
    }

    const token = localStorage.getItem('token')

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!tasksArr.length) return setMsgs([{ text: "Sorry, you should provide a few tasks at least!", type:"danger"}])

        const data = {tasks: tasksArr, projectId, ...formState}

        fetch('http://localhost:5000/app/branchs', {
            method: 'post',
            body: JSON.stringify({ ...data }),
            headers : { "Authorization": token, "Content-Type" : "application/json" }
        })
        .then(res => setUpDate(Math.random() * 10000))
        .catch(err => console.log(err))
    }

    return (
        <div className="center_stuf branch-form">
            <h4>Add a branch</h4>
            { msgs.length ? <Alert msgs={msgs} deleteMsg={deleteMsg}/> : '' } 
            <form style={{width: '45vmax'}} onSubmit={handleSubmit}>
                <div className="field" style={{marginBottom: '1.5rem'}}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" onChange={handleTextChange} value={formState.title} required/>
                </div>
                <div className="field" style={{marginBottom: '1.5rem'}}>
                    <label htmlFor="description">Description</label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={formState.description}
                        onChange={handleTextChange}
                        />
                </div>  
                <div className="field" style={{marginBottom: '2rem'}}>
                    <label htmlFor="tasks">Tasks</label>
                    <ul style={{fontSize: '1.2rem', marginBottom: '1.2rem'}}>
                        { tasksArr.map((task, i)=><li key={i}>{task}</li>) }
                    </ul>
                    <div style={{display: 'flex'}}>
                        <input type="text" name="tasks" style={{flex:'100% 1 1'}} value={newTask} onChange={handleNewTask}/>
                        <button className='btn primary' onClick={addTask}>Add</button>
                    </div>
                </div>
                <ul className="actions" style={{ justifyContent: 'center'}}>
                    <button className="button" type='reset' onClick={resetBtn}>Reset</button>
                    <button className="button primary" style={{marginLeft:'4rem'}}>Submit</button>
                </ul>
            </form>
        </div>
    )
}


export default BranchsForm