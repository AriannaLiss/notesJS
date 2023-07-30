import { deleteAllNotes, deleteNote } from "../../data/notes.js";
import { showErrorMsg, updateTables } from "../../index.js";
import { dateAsText, shortText } from "../../utils/functions.js";
import { makeModalForm } from "../editNoteModal.js";

export const fillTable = (notes, table, makeActionBtns, isEditable = true) => {
    const tbody = table.querySelector('tbody')
    tbody.innerHTML = ''

    notes.length ?
        notes.map(note => tbody.appendChild(noteToTableRow(note, makeActionBtns(note.id), isEditable)))
        : tbody.innerHTML = mergedRow('No any notes yet...');
}

export const initTableHeader = (table, headActionBtns) => {
    const headActions = table.querySelector('[data-col-name="actions"]')
    headActions.innerHTML=''
    headActions.appendChild(headActionBtns())   
}

export const mergedRow = (msg) => {
    return `<tr><td colspan = '6'>${msg}</td></tr>`
}

const noteToTableRow = (note, actionBtns, isEditable = true) =>{
    const row = document.createElement('tr')
    row.dataset.id=note.id 
    row.innerHTML = noteToRowHTML(note)
    row.appendChild(actionBtns)
    isEditable && row.addEventListener('click', () => makeModalForm(note.id))
    return row
}

const noteToRowHTML = (note) => {
    return Object.keys(note).slice(2).reduce((tds, key) => 
        tds += key == 'created' ? 
            `<td data-key=${key}>${dateAsText(note[key])}</td>`
            : `<td data-key=${key}>${shortText(note[key])}</td>`, 
        `<th scope="row" data-key='name'>${note.name}</th>`)
};

export const createActionBtn = (action, svg, onClick) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'btn btn-outline-secondary m-1'
    btn.dataset.btn = action
    btn.innerHTML = svg
    onClick && btn.addEventListener('click',onClick)
    return btn
}

export const deleteRow = (event, id, notes) => {
    event.stopPropagation()
    try{
        deleteNote(id, notes)
        updateTables()
    } catch(error) {
        showErrorMsg(error);
    }
}

export const deleteAllRows = (notes) => {
    deleteAllNotes(notes)
    updateTables()
}
