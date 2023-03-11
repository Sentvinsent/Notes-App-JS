import { getFilters } from './filters';
import { getNotes, sortNotes, loadNotes } from './notes';
import dayjs from "dayjs";
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

//render application notes
const renderNotes = () => {
    const notesEl = document.getElementById('notes');
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchTxt.toLowerCase()));

    notesEl.innerHTML = '';

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note);
            notesEl.appendChild(noteEl);
        })
    } else {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'No notes to added';
        emptyMsg.classList.add('empty-message');
        notesEl.appendChild(emptyMsg);
    }
}

//last edited info
const lastEdited = (timestamp) => (`Last Updated:  ${dayjs(timestamp).fromNow()}`);

//Generate DOM for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a');
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p');


    //setup note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = 'Unnamed note';
    }
    textEl.classList.add('list-item__title');
    noteEl.appendChild(textEl);

    //Setup the link
    noteEl.setAttribute('href', `note.html#${note.id}`)
    noteEl.classList.add('list-item')

    //setup create and updated dates
    statusEl.textContent = lastEdited(note.updated);
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl);

    return noteEl
}

const initialiseNotePage = (id) => {
    const titleEl = document.getElementById('note-title');
    const bodyEl = document.getElementById('note-body');
    const datesTxt = document.getElementById('dates-txt');
    loadNotes()
    const notes = getNotes();
    const note = notes.find((note) => note.id === id);

    if (!note) {
        location.assign('index.html')
    }

    titleEl.value = note.title;
    bodyEl.value = note.body;
    datesTxt.textContent = lastEdited(note.updated);
    
}

export { generateNoteDOM, renderNotes, lastEdited, initialiseNotePage }

