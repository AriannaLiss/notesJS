export const parseContent = (content) => {
    let datePattern=/\d{1,2}\/\d{1,2}\/\d{2,4}/g
    return content.matchAll(datePattern)
}

export const getNote = (notes, id) =>{
    return notes.find(note => note.id == id)
}

export const genID = (notes) => {
    let id = -1;
    notes.forEach(note => {if (note.id>id) id=note.id})
    console.log('new id ' + id)
    return id
}
