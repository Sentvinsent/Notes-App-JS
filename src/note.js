import { initialiseNotePage, lastEdited } from "./views";
import { updateNote, removeNote } from "./notes";

const titleEl = document.getElementById('note-title');
const bodyEl = document.getElementById('note-body');
const removeBtn = document.getElementById('remove-note');
const datesTxt = document.getElementById('dates-txt');
const noteId = location.hash.substring(1);

initialiseNotePage(noteId)

titleEl.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    datesTxt.textContent = lastEdited(note.updated);
})
bodyEl.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    datesTxt.textContent = lastEdited(note.updated);
})
removeBtn.addEventListener('click', () => {
    removeNote(noteId);
    location.assign('index.html');
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initialiseNotePage(noteId)
    }
})

