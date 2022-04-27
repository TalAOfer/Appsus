import { storageService } from "../../../services/storage.service.js"

export const noteService = {
    query,
    check
}

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
    }
]

function query() {
    let notes = storageService.loadFromStorage()
  if (!notes) {
    notes = gNotes
    storageService.saveToStorage(notes)
  }

  return Promise.resolve(notes)
}

function check() {
    console.log('Yep')
}
