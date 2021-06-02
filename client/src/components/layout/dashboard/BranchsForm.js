import React from 'react'
// CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function BranchsForm() {
    return (
        <div className="center_stuf">
            <h4>Add a branch</h4>
            <form  style={{width: '80%'}}>
                <div className="field" style={{marginBottom: '1.5rem'}}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" required/>
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <CKEditor
                        editor={ ClassicEditor }
                        />
                </div>  
            </form>
        </div>
    )
}


export default BranchsForm