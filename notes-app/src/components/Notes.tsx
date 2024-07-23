import { FcEmptyTrash } from "react-icons/fc";
import {Note} from '../types/Note';

interface NotesProps{
    note:Note;
    handleDeleteNote:(id:string)=>void;
}

const Notes:React.FC<NotesProps>=({note,handleDeleteNote})=>{
    return(
        <div className="bg-yellow-200 p-4 min-h-48 rounded-lg mb-3 flex flex-col justify-between  ">
            <span>{note.text}</span>
            <div className="flex flex-row justify-between ">
                <small>{note.date}</small> 
                <FcEmptyTrash 
                onClick={()=>handleDeleteNote(note.id)}
                 className="size-7 cursor-pointer"/>
            </div>
        </div>
    )
}

export default Notes;