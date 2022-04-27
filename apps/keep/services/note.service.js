import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    addNote
}

const NOTES_KEY = 'noteDB'

const gNotes = [
    {
     id: "n101",
     type: "text",
     isPinned: true,
     info: {
     txt: "Fullstack Me Baby!"
     }
    },
    {
        id: "n102",
        type: "video",
        isPinned: false,
        info: {
        txt: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
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
        Be running up that building`
    }
    },
    {
        id: "n104",
        type: "image",
        isPinned: false,
        info: {
        txt: `https://thumbs.dreamstime.com/b/crazy-cat-tongue-hanging-out-40087599.jpg`
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
        With no problems`
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

function query(filterBy) {
    let notes = storageService.loadFromStorage(NOTES_KEY)
    if (!notes) {
    notes = gNotes
    storageService.saveToStorage(NOTES_KEY, notes)
    
  }

  if (filterBy) {
    notes = notes.filter(note => note.type === filterBy)
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
        txt
        }
       }

    notes.unshift(newNote)
    storageService.saveToStorage(NOTES_KEY, notes)

    return Promise.resolve()
}