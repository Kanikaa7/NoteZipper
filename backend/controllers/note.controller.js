const Note = require("../models/note.model.js");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler( async (req, res) => {
    const notes = await Note.find({user: req.user._id});
    res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
    const {title, content, category} = req.body;

    if(!title || !content || !category) {
        res.status(400)
        throw new Error("Please fill all the fields");
    } else {
        const note = new Note({user: req.user._id, title, content, category });
        const createNote = await note.save();

        res.status(201).json(createNote);
    }
});

const getNoteById = asyncHandler( async (req, res) => {
    const note = await Note.findById(req.params.id);

    if(note) {
        res.json(note);
    } else {
        res.status(404).json({message: "Note not found"});
    }
});

const updateNote = asyncHandler( async (req, res) => {
    const note = await Note.findById(req.params.id);

    if(req.user._id.toString() !== note.user.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }
    
    if(note){
        const {title, content, category} = req.body;
        if(title){
            note.title = title;
        }
        if(content){
            note.content = content;
        }
        if(category){
            note.category = category;
        }

        const result = await note.save();
        res.json(result);
    }else{
        res.status(404);
        throw new Error("Note not found");
    }
});

const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if(req.user._id.toString() !== note.user.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if(note){
        await Note.findByIdAndDelete(req.params.id);
        res.json({message: "Note Removed"});
    }else{
        res.status(404);
        throw new Error("Note not found");
    }
});

module.exports = {getNotes, createNote, getNoteById, updateNote, deleteNote};