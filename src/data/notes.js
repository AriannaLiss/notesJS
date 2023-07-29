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
        dates: []
    },
]
