import { v4 as uuidv4 } from 'uuid';

let notes = []

//Read existing note from local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    try {
        notes = notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        notes = []
    }
}

//expose notes array from module
loadNotes();
const getNotes = () => notes;

const createNote = () => {
    const id = uuidv4()
    const timestamp = new Date().getTime();

    notes.push({
        id: id,
        title: '',
        body: '',
        created: timestamp,
        updated: timestamp
    })
    saveNotes();
    return id
}

//Save notes to local storage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//remove a note from a list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes();
    }
}

//Sort notes by one of 3 ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            } else if
                (a.updated < b.updated) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.created > b.created) {
                return -1
            } else if
                (a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
    } else if ('byAbc') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if
                (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    }
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof (updates.title) === 'string') {
        note.title = updates.title;
        note.updated = new Date().getTime();
    }
    if (typeof (updates.body) === 'string') {
        note.body = updates.body;
        note.updated = new Date().getTime();
    }

    saveNotes()

    return note
}

export { getNotes, createNote, removeNote, sortNotes, updateNote, loadNotes }