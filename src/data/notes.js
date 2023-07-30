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
        content: `Evolution occurs when evolutionary processes such as natural selection (including sexual selection) and genetic drift 
            act on this variation, resulting in certain characteristics becoming more or less common within a population over successive 
            generations.`,
        dates: []
    },
    {
        id: 3,
        name: 'New application',
        created: new Date(Date.UTC(2023, 6, 23)),
        category: CATEGORIES.Task,
        content: 'Implement new application up to 8/2/2023 and recieve dream job up to 8/25/2023.',
        dates: ['8/2/2023', '8/25/2023']
    },
    {
        id: 4,
        name: 'Dream',
        created: new Date(Date.UTC(1971, 4, 27)),
        category: CATEGORIES.RandomThought,
        content: `
        ”Imagine there's no countries
        It isn't hard to do
        Nothing to kill or die for
        And no religion too
        Imagine all the people
        Living life in peace
        
        You may say that I'm a dreamer
        But I'm not the only one
        I hope someday you'll join us
        And the world will be as one”
        ― John Lennon, Imagine`,
        dates: []
    },
    {
        id: 5,
        name: 'Appereance',
        created: new Date(Date.UTC(2023, 6, 31)),
        category: CATEGORIES.Idea,
        content: 'Change hairstyle. Make appointment on 9/3/2023.',
        dates: ['9/3/2023']
    },
    {
        id: 6,
        name: 'Business',
        created: new Date(Date.UTC(2021, 2, 10)),
        category: CATEGORIES.Idea,
        content: 'Create my own mobile application. Envisioned 3/10/2021.',
        dates: ['3/10/2021']
    },
    {
        id: 7,
        name: 'Pease everywhere',
        created: new Date(Date.UTC(2023, 8, 5)),
        category: CATEGORIES.RandomThought,
        content: 'Help all children recieve great education and make good money. Start new school 9/1/2023.',
        dates: ['9/1/2023']
    },
]

export const NOTES_ARCHIVED = []

export const getNote = (id) =>{
    return NOTES.find(note => note.id == id)
}

export const saveNote = (note) => {
    validateNote(note)
    note.dates = [...parseContent(note.content)];
    note.id ? editNote(note) : addNewNote(note)
}

export const archiveNote = (id) => {
    NOTES_ARCHIVED.push(NOTES.find(note => note.id == id))
    deleteNote(id)
}

export const unpackNote = (id) => {
    NOTES.push(NOTES_ARCHIVED.find(note => note.id == id))
    deleteNote(id, NOTES_ARCHIVED)
}

export const deleteNote = (id, list = NOTES) => {
    const index = list.findIndex(note => note.id == id);
    if (index>=0) list.splice(index,1);
    else throw new Error(`No notes with id ${id}`);
}

export const archiveAllNotes = () => {
    NOTES.forEach(note => NOTES_ARCHIVED.push(note))
    deleteAllNotes()
}

export const unpackAllNotes = () => {
    NOTES_ARCHIVED.forEach(note => NOTES.push(note))
    deleteAllNotes(NOTES_ARCHIVED)
}

export const deleteAllNotes = (list = NOTES) => {
    list.splice(0);
}

export const summary = () => {
    return { active: countByCategories(NOTES), archived: countByCategories(NOTES_ARCHIVED)}
}

const countByCategories = (list) => {
    const initSummary = Object.values(CATEGORIES).reduce((init, category) => { return {...init, [category]:0}}, {})
    if (list.length<0) return initSummary
    return list.reduce((count, note) => {
        count[note.category]++
        return count
    } , initSummary)
}

const validateNote = (note) => {
    if (!note.name || !note.category || !note.content) throw new Error('Title and content cannot be empty.')
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
