import { getNote, INIT_NOTE, saveNote } from "../data/notes.js";
import { showErrorMsg, updateTables } from "../index.js";
import { CATEGORIES } from "../utils/const.js";
import { closeModal, makeBtn, showModal } from "./common/modal.js";

export const makeModalForm = (id) => {
  showModal()
  const container = modal.querySelector('div');
  const note = id ? getNote(id) : {...INIT_NOTE};
  container.innerHTML = noteToFormHTML(note)
  container.appendChild(makeBtns(id))
}

const save = (id) => {
  try {
    const note = {...parseForm(), id:id};
    saveNote(note)
    closeModal();
    updateTables();
  } catch(error) {
      showErrorMsg(error);
  }
}

const parseForm = () => {
  const note = {...INIT_NOTE}
  note.name = document.querySelector('#note-name').value.trim();
  note.content = document.querySelector('#note-content').value.trim();
  note.category = document.querySelector('#note-category').value;
  return note;
}

const noteToFormHTML = (note) => {
  return `<div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Title</span>
      <input id='note-name' type="text" class="form-control" placeholder="Title" value="${note.name}">
    </div>

    <div class="mb-3">
      <label class="form-label">Choose category</label>
      <select id='note-category' class="form-select" aria-label="Category">
        ${showCategories(note.category)}
      </select>
    </div>
    
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Content</span>
      <textarea id='note-content' class="form-control" placeholder="Text">${note.content}</textarea>
    </div>`
}

const showCategories = (category) => {
  return Object.values(CATEGORIES).map(value => 
      category == value ? 
        `<option value="${value}" selected>${value}</option>`
        :`<option value="${value}">${value}</option>`
  )
}

const makeBtns = (id) => {
  const btn_container = document.createElement('div');
  btn_container.className = 'btn-container'
  btn_container.appendChild(makeBtn('Close', closeModal, false))
  btn_container.appendChild(makeBtn('Save', () => save(id)))
  return btn_container
}
