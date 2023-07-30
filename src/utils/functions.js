export const showErrorMsg = (msg) => {
    const error = document.querySelector('#error')
    error.innerText = msg
    error.classList.remove('hide')
    setTimeout(()=>error.classList.add('hide'),4000)
}
