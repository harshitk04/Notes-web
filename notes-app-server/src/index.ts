import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/notes",async (req,res)=>{
    const {search}= req.query;
    let notes;
    if(search){
        notes= await prisma.note.findMany({
            where:{
                text:{
                    contains: search as string,
                    mode: 'insensitive'
                },
            },
        });
    }else{
        notes = await prisma.note.findMany();    
    }
    res.json(notes);
})

app.post("/api/notes",async (req,res)=>{
    const {text} = req.body;
    if(!text){
        res.status(400).json({
            error:"Text is required"
        })
    }
    if(text.trim() === ''){
        res.json({
            error:"Text cannot be empty"
        })
    }

    const date = new Date().toLocaleDateString();
    try{
        const newNote = await prisma.note.create({
            data: {text,date}
        });
        res.json(newNote);
    }catch(error){
        res.status(500).send("Oops something went wrong")
    }
})

app.delete('/api/notes/:id', async (req,res)=>{
    const id = parseInt(req.params.id);
    try{
        await prisma.note.delete({
            where:{id}
        });
        res.status(204).send();
    }catch(error){
        res.status(200).send("Oops, something went wrong ");
    }
})

app.listen(5001, ()=>{
    console.log("server running on localhost:5001");
});
