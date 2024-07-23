import Notes from './Notes';
import {Note} from '../types/Note'
import AddNote from './AddNote';
import React from 'react';

interface NotelistProps{
    notes:Note[];
    handleAddNote: (text:string)=>void;
    handleDeleteNote: (id:string)=>void;
}

const NotesList:React.FC<NotelistProps> = ({notes,handleAddNote,handleDeleteNote})=>{
    return(
        <div className='grid gap-4 grid-cols-3  '>
            {notes.map ((note)=>(
                <Notes key={note.id} note={note} handleDeleteNote={handleDeleteNote}/>
            ))}
            <AddNote handleAddNote={handleAddNote}/>
        </div>
    )
}

export default NotesList;