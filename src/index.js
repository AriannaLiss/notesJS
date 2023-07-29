import { showModal } from "./components/modal.js"
import { fillTable } from "./components/table.js"

fillTable(true)

document.querySelector('#create_note').addEventListener('click', () => showModal())
