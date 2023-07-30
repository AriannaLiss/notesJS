import { summary } from "../data/notes.js"
import { goToAnchor } from "../index.js"
import { CATEGORIES } from "../utils/const.js"
import { showArchivedTable } from "./archivedTable.js"

export const updateSummary = () => {
    const summaryData = summary()
    
    const summaryRowsHTML = Object.values(CATEGORIES).map(category => 
        `<tr data-category=${category}>
            <th scope="row">${category}</th>
            <td>${summaryData.active[category]}</td>
            <td>${summaryData.archived[category]}</td>
        </tr>`
    )

    document.querySelector('#table-summary>tbody').innerHTML = summaryRowsHTML.join('')
}

export const initSummaryHeader = () => {
    const showArchivedBtn = document.querySelector('#table-summary [data-col-name="archived"]')
    const showActiveBtn = document.querySelector('#table-summary [data-col-name="active"]')
    showArchivedBtn.addEventListener('click', showArchivedTable)
    showActiveBtn.addEventListener('click', () => goToAnchor('table-notes'))
}
