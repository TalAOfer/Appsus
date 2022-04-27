import { NotePreview } from "./note-preview.jsx"

export function NoteList({notes, handleRemoveNote}) {

        return <React.Fragment>
            {notes && <section className="note-list">
                {notes.map(note=><NotePreview key={note.id} note={note} handleRemoveNote={handleRemoveNote}/>)}
                </section>}
            </React.Fragment>

}

