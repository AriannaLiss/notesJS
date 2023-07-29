import { closeModal } from "../components/modal.js"
import { fillTable } from "../components/table.js"
import { INIT_NOTE, NOTES } from "../data/notes.js"

export const parseContent = (content) => {
    let datePattern=/\d{1,2}\/\d{1,2}\/\d{2,4}/g
    return content.matchAll(datePattern)
}

export const getNote = (id) =>{
    return NOTES.find(note => note.id == id)
}

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const saveNote = (id) => {
    try{
        let note = id ? getNote(id) : {...INIT_NOTE};
        note.name = document.querySelector('#note-name').value.trim();
        note.content = document.querySelector('#note-content').value.trim();
        
        if (!note.name || !note.content) throw new Error('Title and content cannot be empty.')
        
        note.category = document.querySelector('#note-category').value;
        note.dates = [...parseContent(note.content)];
        
        if (!id) {
            note.id = uid(),
            note.created = Date.now()
            NOTES.push(note);
        }
        
        closeModal();
        fillTable();
    } catch(e) {
        console.log(e)
        showErrorMsg(e);
    }
}

export const showErrorMsg = (msg) => {
    const error = document.querySelector('#error')
    error.innerText = msg
    error.classList.remove('hide')
    setTimeout(()=>error.classList.add('hide'),4000)
}
