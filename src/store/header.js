import {defineStore} from "pinia";
import { ref } from "vue";

export const useHeaderStore = defineStore('courseStore', () => {
    const menu = ref([
        {title: 'Introduction', path: '/introduction' },
        {title: 'Chapter 1', path: '/chapter-1' },
        {title: 'Chapter 2', path: '/chapter-2' },
    ])

    const glossary = ref([
        { term: 'Term 1', definition: 'Definition of Term 1' },
        { term: 'Term 2', definition: 'Definition of Term 2' },
        { term: 'Term 3', definition: 'Definition of Term 3' },
    ])

    const downloadLinks = ref([
        { title: 'Material 1', url: '/downloads/material1.pdf' },
        { title: 'Material 2', url: '/downloads/material2.pdf' },
        { title: 'Material 3', url: '/downloads/material3.pdf' },
    ])

    return {
        menu,
        glossary,
        downloadLinks
    }
})