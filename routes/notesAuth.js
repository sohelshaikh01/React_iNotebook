import express from 'express';
import fetchUser from '../middleware/fetchUser.js';
const router = express.Router();
import Note from '../models/Note.js';
import { body, validationResult } from 'express-validator';

// ROUTE 1: Get all the notes using: GET "api/notes/fetchnotes". Login required.

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});


// ROUTE 2: Add new notes using: POST "api/notes/addnote". Login required.

router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // If there are errors, send bad request and the errors.
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const note = new Note ({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});


// ROUTE 3: Update an existing note using: PUT "api/notes/updatenote". Login required.

router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // Create a newNote Object
        const newNote = {};
        if(title) { newNote.title = title };
        if(description) { newNote.description = description };
        if(tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        // This take id in API Endpoint to find note

        if(!note) {return res.status(404).send("Not Found"); }
        
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});

    }
    catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
   
});


// ROUTE 4: Delete an existing note using: DELETE "api/notes/deletenote". Login required.

router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        let note = await Note.findById(req.params.id);
        // This take id in API Endpoint to find note

        if(!note) {return res.status(404).send("Not Found"); }
        
        // Allow deletion only if user owns this
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "This note has been deleted.", note: note});
  
    }
    
    catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});





export default router;