
const Categories = {
    Task: 'Task',
    RandomThought: 'Random Thought',
    Idea: 'Idea'
}

const notes = [
    {
        name: 'Shopping list',
        created: Date.now(),
        category: Categories.Task,
        content: 'Tomatos, bread',
        dates: []
    },
    {
        name: 'The theory of evolution',
        created: Date.now(),
        category: Categories.RandomThought,
        content: 'The evolution was created as...',
        dates: []
    },
    {
        name: 'NewFeature',
        created: Date.now(),
        category: Categories.Idea,
        content: 'Implement new application up to 3/5/2021 and recieve dream job up to 5/5/2021.',
        dates: []
    },
]

const parseContent = (content) => {
    let datePattern=/\d{1,2}\/\d{1,2}\/\d{2,4}/g
    return content.matchAll(datePattern)
}

notes.forEach(note => note.dates=[...parseContent(note.content)])

const table = document.querySelector('#table-notes')

const rows = notes.map(note => `<tr><th scope="row">${note.name}</th>` + Object.values(note).slice(1).map(value => `<td>${value}</td>`).join('') + '<td></td></tr>')

console.log(rows.join(''))

table.querySelector('tbody').innerHTML+=rows.join('')


