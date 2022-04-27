import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    check,
    addNote
}

const NOTES_KEY = 'noteDB'

const gNotes = [
    {
     id: "n101",
     type: "note-txt",
     isPinned: true,
     info: {
     txt: "Fullstack Me Baby!"
     }
    },
    {
        id: "n102",
        type: "note-txt",
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
        id: "n103",
        type: "note-txt",
        isPinned: false,
        info: {
        txt: `You don't want to hurt me (Iyeh-yeh-yo)
        But see how deep the bullet lies (Iyeh-yeh-yo)
        Unaware I'm tearing you asunder (Iyeh-yeh-yo)
        Ooh, there is thunder in our hearts (Iyeh-yeh-yo)
        Is there so much hate for the ones we love? (Iyeh-yeh-yo)
        Tell me, we both matter, don't we? (Iyeh-yeh-yo)`
    }
    },
    {
        id: "n104",
        type: "note-txt",
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

function query() {
    let notes = storageService.loadFromStorage(NOTES_KEY)
  if (!notes) {
    notes = gNotes
    storageService.saveToStorage(NOTES_KEY, notes)
  }

  return Promise.resolve(notes)
}

function check() {
    console.log('Yep')
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