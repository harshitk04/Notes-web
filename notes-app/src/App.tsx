import React, { useEffect, useState } from 'react';
import './App.css';
import NotesList from './components/NotesList';
import { nanoid } from 'nanoid';
import {Note} from './types/Note';
import axios from 'axios';

const App: React.FC = ()=> {
  const [notes,setNotes] = useState<Note[]>([]);
  const [searchText,setSearchText] = useState<string>('');

  const fetchNotes = async(search: string='')=>{
    try{
      const response = await axios.get("http://localhost:5001/api/notes",{
        params:{search},
      });
      setNotes(response.data);
    }catch(error){
      console.log('Error fetching Notes: ', error);
    }
  };
  useEffect(()=>{    
    fetchNotes();
  },[])

  const addNote = async (text:string)=>{
    const date = new Date().toLocaleDateString();
    const newNote: Note = {
      id: nanoid(),
      text,
      date,
    };
    try{
      const response = await axios.post("http://localhost:5001/api/notes",newNote);
      fetchNotes();
    }catch(error){
      console.log("Error adding Note: ",error);
    }
  };

  const deleteNote = async (id:string)=>{
    try{
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      fetchNotes();
    }catch(error){
      console.log('Error in deleting the Note :', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchText(event.target.value);
    fetchNotes(event.target.value);
  }

  return (
    <div className="max-w-screen-lg ml-auto mr-auto pr-4 pl-4">
      <div className="font-extrabold text-4xl flex justify-center">
        <h1>Notes</h1>
        <br  /> 
      </div>
      <input
        type='text'
        placeholder='Search Notes....'
        className='w-full max-w-6xl m-4 p-2 border border-gray-950 border-solid rounded-lg '
        value={searchText}
        onChange={handleSearch}
      />
      <NotesList notes={notes} handleAddNote={addNote} handleDeleteNote={deleteNote}/>
    </div>
  )
}
export default App;