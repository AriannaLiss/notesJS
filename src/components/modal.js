import { genID, getNote, parseContent } from "../utils/functions.js";
import { fillTable } from "./table.js";

export const showModal = (notes, id) => { 
  const modal = document.querySelector('#modal')
  modal.classList.remove('hide')
  const container = modal.querySelector('div');

  const note = getNote(notes, id);
  container.innerHTML = `
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Name</span>
      <input id='note-name' type="text" class="form-control" placeholder="Title" value="${note.name}">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Content</span>
      <textarea id='note-content' class="form-control">${note.content}</textarea>
    </div>
    `
  const btn_container = document.createElement('div');
  btn_container.className = 'btn-container'

  const save = document.createElement('button');
  save.className='btn btn-primary'
  save.addEventListener('click', () => saveNote(notes, id))
  save.innerText = 'Save'

  const close = document.createElement('button');
  close.className='btn btn-secondary'
  close.addEventListener('click', () => closeModal())
  close.innerText = 'Close'

  btn_container.appendChild(close)
  btn_container.appendChild(save)

  container.appendChild(btn_container)
}

const closeModal = () => {
  document.querySelector('#modal').classList.add('hide')
}

const saveNote = (notes, id) => {
  let note = getNote(notes, id);
  if (!note) {
      note = {
          id: genID(notes),
          created : Date.now()
      };
  }
  note.name = document.querySelector('#note-name').value;
  note.content = document.querySelector('#note-content').value;
  note.dates = [...parseContent(note.content)];
  closeModal();
  fillTable(notes);
}
