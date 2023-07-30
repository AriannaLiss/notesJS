export const showModal = () => getModal().classList.remove('hide')

export const closeModal = () => getModal().classList.add('hide')

export const initModal = () => {
  const modal = getModal()
  modal.addEventListener('click', (e) => {
    e.target === modal && closeModal()
  })
}

export const getModal = () => {
  return document.querySelector('#modal')
}

export const makeBtn = (text, handler, isPrimary=true) => {
  const btn = document.createElement('button');
  btn.className=isPrimary ? 'btn btn-primary' : 'btn btn-secondary'
  btn.addEventListener('click', handler)
  btn.innerText = text
  return btn
}
