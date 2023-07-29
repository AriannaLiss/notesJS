import { CATEGORIES } from "../utils/const.js";
import { getNote, saveNote } from "../utils/functions.js";

const showCategories = (category) => {
  return  `<option value=''>Choose category</option>` + 
    Object.values(CATEGORIES).map(value => 
      category == value ? 
        `<option value="${value}" selected>${value}</option>`
        :`<option value="${value}">${value}</option>`
  )
}

export const showModal = (id) => { 
  const modal = document.querySelector('#modal')
  modal.classList.remove('hide')
  const container = modal.querySelector('div');

  const note = id ? getNote(id) : {name: '', content: ''};
  
  container.innerHTML = `
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Name</span>
      <input id='note-name' type="text" class="form-control" placeholder="Title" value="${note.name}">
    </div>

    <select id='note-category' class="form-select mb-3" aria-label="Category">
      ${showCategories(note.category)}
    </select>
    
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Content</span>
      <textarea id='note-content' class="form-control" placeholder="Text">${note.content}</textarea>
    </div>
    `
  const btn_container = document.createElement('div');
  btn_container.className = 'btn-container'

  const save = document.createElement('button');
  save.className='btn btn-primary'
  save.addEventListener('click', () => saveNote(id))
  save.innerText = 'Save'

  const close = document.createElement('button');
  close.className='btn btn-secondary'
  close.addEventListener('click', () => closeModal())
  close.innerText = 'Close'

  btn_container.appendChild(close)
  btn_container.appendChild(save)

  container.appendChild(btn_container)
}

export const closeModal = () => {
  document.querySelector('#modal').classList.add('hide')
}