import { parseContent } from "../utils/functions.js";
import { showModal } from "./modal.js";

const makeRow = (note) =>{
    let row = `<tr data-id=${note.id}><th scope="row" data-key='name'>${note.name}</th>` 
    for (const[key,value] of Object.entries(note).slice(2)){
        row+=`<td data-key=${key}>${value}</td>`
     } 
    row+='<td><img class="action-link action-edit" src="./src/img/pencil.svg"></td></tr>'
    return row
}


const makeEditable = (e, notes) => {
    const id = e.target.parentNode.parentNode.dataset.id
    showModal(notes, id)
}

export const fillTable = (notes, shouldBeParsed = false) =>{

    const table = document.querySelector('#table-notes');
    table.querySelector('tbody').innerHTML = '';

    shouldBeParsed && notes.forEach(note => note.dates=[...parseContent(note.content)])

    const rows = notes.map(note => makeRow(note))

    table.querySelector('tbody').innerHTML+=rows.join('')

    const edit_btns = document.querySelectorAll(".action-edit");

    edit_btns.forEach(edit => edit.addEventListener("click", e => makeEditable(e, notes)))
}
