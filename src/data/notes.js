import { CATEGORIES } from "../utils/const.js";

export const INIT_NOTE ={
    id:'',
    name:'',
    created:undefined,
    category:undefined,
    content:'',
    dates:[]
}

export const NOTES = [
    {
        id: 1,
        name: 'Shopping list',
        created: new Date(Date.UTC(2021, 11, 20)),
        category: CATEGORIES.Task,
        content: 'Tomatos, bread',
        dates: []
    },
    {
        id: 2,
        name: 'The theory of evolution',
        created: new Date(Date.UTC(2022, 0, 1)),
        category: CATEGORIES.RandomThought,
        content: 'The evolution was created as...',
        dates: []
    },
    {
        id: 3,
        name: 'NewFeature',
        created: new Date(Date.UTC(202, 6, 5)),
        category: CATEGORIES.Idea,
        content: 'Implement new application up to 3/5/2021 and recieve dream job up to 5/5/2021.',
        dates: ['3/5/2021', '5/5/2021']
    },
]

export const getNote = (id) =>{
    return NOTES.find(note => note.id == id)
}

export const saveNote = (note) => {
    validateNote(note)
    note.dates = [...parseContent(note.content)];
    note.id ? editNote(note) : addNewNote(note)
}

export const deleteNote = (id) => {
    NOTES.splice(NOTES.findIndex(note => note.id === id),1)
}

const validateNote = (note) => {
    if (!note.name || !note.content) throw new Error('Title and content cannot be empty.')
}

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const addNewNote = (note) => {
    note.id = uid(),
    note.created = Date.now()
    NOTES.push(note);
}

const editNote = (note) => {
    const editedNote = getNote(note.id)
    editedNote.name = note.name
    editedNote.category = note.category
    editedNote.content = note.content
    editedNote.dates = note.dates
}

const parseContent = (content) => {
    let datePattern=/\d{1,2}\/\d{1,2}\/\d{2,4}/g
    return content.matchAll(datePattern)
}
