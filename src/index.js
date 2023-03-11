import { createNote, loadNotes } from "./notes";
import { setFilters } from "./filters";
import { renderNotes } from "./views";

//Add new element
const addNote = () => {
    const id = createNote();
    location.assign(`note.html#${id}`);
}

renderNotes()

document.querySelector('#create-note').addEventListener('click', addNote);

document.querySelector('#search-txt').addEventListener('input', (e) => {
    setFilters({ searchTxt: e.target.value })
    renderNotes()
})

document.getElementById('sort-by').addEventListener('change', (e) => {
    setFilters({ sortBy: e.target.value })
    renderNotes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        loadNotes()
        renderNotes()
    }
})