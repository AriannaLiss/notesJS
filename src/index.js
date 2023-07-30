import { fillArchivedTable, initArchiveTableHeader, isArchiveTableShowed } from "./components/archivedTable.js"
import { showModal } from "./components/modal.js"
import { initSummaryHeader, updateSummary } from "./components/summary.js"
import { fillTable, initTableHeader } from "./components/table.js"

export const updateTables = () => {
    fillTable()
    updateSummary()
    isArchiveTableShowed() && fillArchivedTable()
}

export const showErrorMsg = (msg) => {
    const error = document.querySelector('#error')
    error.innerText = msg
    error.classList.remove('hide')
    setTimeout(()=>error.classList.add('hide'),4000)
}

export const goToAnchor = (anchor) => {
    var loc = document.location.toString().split('#')[0];
    document.location = loc + '#' + anchor;
    return false
}

initTableHeader()
initSummaryHeader()
initArchiveTableHeader()

updateTables()

document.querySelector('#create_note').addEventListener('click', () => showModal())
