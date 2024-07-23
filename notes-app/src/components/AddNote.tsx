import React, { useState } from "react";
interface Addnotesprops {
    handleAddNote: (text:string)=> void;
}
const AddNote:React.FC<Addnotesprops> = ({handleAddNote}) => {
    const [newtext,setnewText] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        if(200-event.target.value.length>=0)
        setnewText(event.target.value);
    };

    const handleSaveClick = () =>{   
        if(newtext.trim().length>0){
            handleAddNote(newtext);
            setnewText('');
        }      
    };

    return (
        <div className="bg-sky-300 flex flex-col p-2 rounded-2xl">
            <textarea className="bg-sky-300 border-none focus:outline-none resize-none min-h-48 mb-3"
                rows={8}
                cols={10}
                placeholder="Type to add a note"
                onChange={handleChange}
                value={newtext}
            ></textarea>
            <div className="flex justify-between">
            <small>{200 - newtext.length} remaining</small>
                <button className="bg-slate-200 rounded-2xl p-2 hover:bg-white "
                onClick={handleSaveClick}
                >Save</button>
            </div>

        </div>
    );
};

export default AddNote;