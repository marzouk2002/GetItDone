import React, { useState } from 'react'
// CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function BranchsForm() {
    const [ newTask, setNewTask ] = useState('')
    const [ tasksArr, setTaskArr ] = useState([])
    const [ formState, setFormState ] = useState({
        title: '',
        description: ''
    })

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

    return (
        <div className="center_stuf">
            <h4>Add a branch</h4>
            <form style={{width: '50vmax'}}>
                <div className="field" style={{marginBottom: '1.5rem'}}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" onChange={handleTextChange} required/>
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