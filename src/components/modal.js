import { getNote, INIT_NOTE, saveNote } from "../data/notes.js";
import { CATEGORIES } from "../utils/const.js";
import { showErrorMsg } from "../utils/functions.js";
import { fillTable } from "./table.js";

export const showModal = (id) => { 
  const modal = getModal()
  modal.classList.remove('hide')
  const container = modal.querySelector('div');

  const note = id ? getNote(id) : {...INIT_NOTE};
  
  container.innerHTML = noteToFormHTML(note)

  container.appendChild(makeBtns(id))
}

export const closeModal = () => {
  getModal().classList.add('hide')
}

const save = (id) => {
  try {
    const note = {...INIT_NOTE};

    note.id = id;
    note.name = document.querySelector('#note-name').value.trim();
    note.content = document.querySelector('#note-content').value.trim();
    note.category = document.querySelector('#note-category').value;

    saveNote(note)
    closeModal();
    fillTable();
  } catch(e) {
      showErrorMsg(e);
  }
}

const showCategories = (category) => {
  return  `<option value=''>Choose category</option>` + 
    Object.values(CATEGORIES).map(value => 
      category == value ? 
        `<option value="${value}" selected>${value}</option>`
        :`<option value="${value}">${value}</option>`
  )
}

const noteToFormHTML = (note) => {
  return `<div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Name</span>
      <input id='note-name' type="text" class="form-control" placeholder="Title" value="${note.name}">
    </div>

    <select id='note-category' class="form-select mb-3" aria-label="Category">
      ${showCategories(note.category)}
    </select>
    
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Content</span>
      <textarea id='note-content' class="form-control" placeholder="Text">${note.content}</textarea>
    </div>`
}

const makeBtns = (id) => {
  const btn_container = document.createElement('div');
  btn_container.className = 'btn-container'

  const btnSave = document.createElement('button');
  btnSave.className='btn btn-primary'
  btnSave.addEventListener('click', () => save(id))
  btnSave.innerText = 'Save'

  const btnClose = document.createElement('button');
  btnClose.className='btn btn-secondary'
  btnClose.addEventListener('click', () => closeModal())
  btnClose.innerText = 'Close'

  btn_container.appendChild(btnClose)
  btn_container.appendChild(btnSave)

  return btn_container
}

const getModal = () => {
  return document.querySelector('#modal')
}
