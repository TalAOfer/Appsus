import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    addNote,
    removeNote,
    changeNoteColor,
    changeNoteText,
    changePin
}

const NOTES_KEY = 'noteDB'

const gNotes = [
    {
        id: "n101",
        type: "text",
        isPinned: false,
        info: {
            txt: "Been running up the hill",
            color: 'white'
        }
    },
    {
        id: "n102",
        type: "video",
        isPinned: false,
        info: {
            txt: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
            color: '#F9FFA4'
        }
    },
    {
        id: "n103",
        type: "text",
        isPinned: false,
        info: {
            txt: `And if I only could
            I'd make a deal with God
            And I'd get him to swap our places
            Be running up that road
            Be running up that hill
            Be running up that building`,
            color: 'white'
        }
    },
    {
        id: "n104",
        type: "image",
        isPinned: true,
        info: {
            txt: `https://thumbs.dreamstime.com/b/crazy-cat-tongue-hanging-out-40087599.jpg`,
            color: '#B4FF9F'
        }
    },
    {
        id: "n105",
        type: "text",
        isPinned: false,
        info: {
            txt: `Say, if I only could
        I'd make a deal with God
        And I'd get him to swap our places
        I'd be running up that road
        Be running up that hill
        With no problems`,
        color: 'white'
        }
    }
]

const gTrash = [
    {
        id: "n110",
        type: "text",
        isPinned: true,
        info: {
            txt: "Trashcanning!"
        }
    }
]

function query(filterBy, search) {
    let notes = storageService.loadFromStorage(NOTES_KEY)
    if (!notes || notes.length === 0) {
        notes = gNotes
        storageService.saveToStorage(NOTES_KEY, notes)
    }

    if (filterBy) {
        notes = notes.filter(note => note.type === filterBy)
    }

    if (search) {
        notes = notes.filter(note => note.info.txt.toLowerCase().includes(search.toLowerCase()))
    }

    return Promise.resolve(notes)
}

function addNote(txt, type) {
    let notes = storageService.loadFromStorage(NOTES_KEY)

    const newNote = {
        id: utilService.makeId(),
        type,
        isPinned: false,
        info: {
            txt,
            color: 'white'
        }
    }

    notes.unshift(newNote)
    storageService.saveToStorage(NOTES_KEY, notes)

    return Promise.resolve()
}

function _getNoteIdxById(noteId) {
    console.log(noteId)
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = notes.findIndex(note => noteId === note.id)

    return noteIdx
}

function _getNoteById(noteId) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const note = notes.find(note => noteId === note.id)

    return note
}

function removeNote(noteId) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    console.log(notes)
    const noteIdx = _getNoteIdxById(noteId)
    notes.splice(noteIdx, 1)
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()

}

function changeNoteColor(noteId, color) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = _getNoteIdxById(noteId)
    notes[noteIdx].info.color = color
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()
}

function changeNoteText(noteId, text) {
    console.log(text)
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = _getNoteIdxById(noteId)
    notes[noteIdx].info.txt = text
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()
}

function changePin(noteId) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = _getNoteIdxById(noteId)
    notes[noteIdx].isPinned = !notes[noteIdx].isPinned
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()
}