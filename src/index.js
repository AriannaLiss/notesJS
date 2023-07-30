import { fillArchivedTable, initArchiveTableHeader, isArchiveTableShown, showArchivedTable } from "./components/archivedTable.js"
import { initSummaryHeader, updateSummary } from "./components/summaryTable.js"
import { initModal } from "./components/common/modal.js"
import { makeModalForm } from "./components/editNoteModal.js"
import { fillActiveTable, initActiveTableHeader } from "./components/activeTable.js"

export const updateTables = () => {
    fillActiveTable()
    updateSummary()
    isArchiveTableShown() && fillArchivedTable()
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

initActiveTableHeader()
initArchiveTableHeader()
initSummaryHeader()
initModal()

updateTables()

document.querySelector('#create_note').addEventListener('click', () => makeModalForm())
document.querySelector('#show_archived_table_btn').addEventListener('click', showArchivedTable)
