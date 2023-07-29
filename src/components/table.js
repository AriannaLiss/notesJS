import { NOTES } from "../data/notes.js";
import { parseContent } from "../utils/functions.js";
import { showModal } from "./modal.js";

const makeRow = (note) =>{
    let row = `<tr data-id=${note.id}><th scope="row" data-key='name'>${note.name}</th>` 
    for (const[key,value] of Object.entries(note).slice(2)){
        row += key == 'created' ? 
            `<td data-key=${key}>${new Date(value).toLocaleDateString('en-US')}</td>`
            : `<td data-key=${key}>${value}</td>`
     } 
    row+='<td><img class="action-link action-edit" src="./src/img/pencil.svg"></td></tr>'
    return row
}


const makeEditable = (e) => {
    const id = e.target.parentNode.parentNode.dataset.id
    showModal(id)
}

export const fillTable = (shouldBeParsed = false) =>{

    const table = document.querySelector('#table-notes');
    table.querySelector('tbody').innerHTML = '';

    shouldBeParsed && NOTES.forEach(note => note.dates=[...parseContent(note.content)])

    const rows = NOTES.map(note => makeRow(note))

    table.querySelector('tbody').innerHTML+=rows.join('')

    const edit_btns = document.querySelectorAll(".action-edit");

    edit_btns.forEach(edit => edit.addEventListener("click", makeEditable))
}
