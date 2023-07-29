import { CATEGORIES } from "../utils/const.js";

export const NOTES = [
    {
        id: 1,
        name: 'Shopping list',
        created: Date.now(),
        category: CATEGORIES.Task,
        content: 'Tomatos, bread',
        dates: []
    },
    {
        id: 2,
        name: 'The theory of evolution',
        created: Date.now(),
        category: CATEGORIES.RandomThought,
        content: 'The evolution was created as...',
        dates: []
    },
    {
        id: 3,
        name: 'NewFeature',
        created: Date.now(),
        category: CATEGORIES.Idea,
        content: 'Implement new application up to 3/5/2021 and recieve dream job up to 5/5/2021.',
        dates: []
    },
]
