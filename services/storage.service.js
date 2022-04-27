export const storageService = {
    loadFromStorage,
    saveToStorage
}

const KEY = 'notesDB'

function saveToStorage(notes) {
    localStorage.setItem(KEY, JSON.stringify(notes))
}

function loadFromStorage() {
    var notes = localStorage.getItem(KEY)
    return JSON.parse(notes)
}

function checkStorage() {
    console.log('storage Indeed')
}