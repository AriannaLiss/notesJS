import { deleteAllNotes, deleteNote, NOTES_ARCHIVED, unpackAllNotes, unpackNote } from "../data/notes.js";
import { goToAnchor, showErrorMsg, updateTables } from "../index.js";
import { findID } from "../utils/functions.js";
import { updateSummary } from "./summary.js";
import { makeRow } from "./table.js";

export const isArchiveTableShowed = () => {
    return !document.querySelector('#table-archived-notes').classList.contains('hide')
}

export const showArchivedTable = () => {
    const table = document.querySelector('#table-archived-notes')
    if (!isArchiveTableShowed()) {
        table.classList.remove('hide')
        goToAnchor('table-archived-notes')
        fillArchivedTable()
    } else {
        table.classList.add('hide') 
    }
}

export const fillArchivedTable = () => {
    const tbody = document.querySelector('#table-archived-notes>tbody')
    tbody.innerHTML = ''
    
    NOTES_ARCHIVED.length ?
        NOTES_ARCHIVED.map(note => tbody.appendChild(makeRow(note, makeActionBtns, false)))
        : tbody.innerHTML='No any archived notes yet...'
}

export const initArchiveTableHeader = () => {
    const headActions = document.querySelector('#table-archived-notes [data-col-name="actions"]')
    headActions.innerHTML=''
    headActions.appendChild(makeHeadActionBtns())   
}

const makeActionBtns = () => {
    const unpackSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
        </svg>`

    const deleteSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
        </svg>`

    const td = document.createElement('td')
    const container = document.createElement('div')
    container.className='btn-right-container'
    container.appendChild(createActionBtn('unpack', unpackSVG, unpackRow))
    container.appendChild(createActionBtn('delete', deleteSVG, deleteRow))
    td.appendChild(container)
    return td
}

const makeHeadActionBtns = () => {

    const unpackALLSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
            <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/>
        </svg>`

    const deleteAllSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
        </svg>`

    const container = document.createElement('div')
    container.className='btn-right-container'
    container.appendChild(createActionBtn('archive', unpackALLSVG, unpackAllRows))
    container.appendChild(createActionBtn('delete', deleteAllSVG, deleteAllRows))
    return container
}

const createActionBtn = (action, svg, onClick) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'btn btn-outline-secondary m-1'
    btn.dataset.btn = action
    btn.innerHTML = svg
    btn.addEventListener('click',onClick)
    return btn
}

const unpackRow = (e) => {
    e.stopPropagation()
    unpackNote(findID(e.target.parentNode))
    updateTables()
}

const deleteRow = (e) => {
    e.stopPropagation()
    try{
        const id = findID(e.target.parentNode)
        deleteNote(id, NOTES_ARCHIVED)
        updateSummary()
        fillArchivedTable()
    } catch(e) {
        showErrorMsg(e);
    }
}

const unpackAllRows = () => {
    unpackAllNotes()
    updateTables()
}

const deleteAllRows = () => {
    deleteAllNotes(NOTES_ARCHIVED)
    updateSummary()
    fillArchivedTable()
}
