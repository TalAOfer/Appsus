import { NotePreview } from "./note-preview.jsx"

export function NoteList({notes, handleRemoveNote, handleColorChange, handleChosenNote}) {

        return <React.Fragment>
            {notes && <section className="note-list">
                {notes.map(note=><NotePreview key={note.id} note={note} handleRemoveNote={handleRemoveNote} handleColorChange={handleColorChange} handleChosenNote={handleChosenNote}/>)}
                </section>}
            </React.Fragment>

}

