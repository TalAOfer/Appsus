export function NotePreview({note}) {

        if (note.type === 'image') {
            console.log(note)
            return <section className="note-preview">
                <img src={note.info.txt} alt="" />
        </section>
        }

        return <section className="note-preview">
            <p>{`${note.info.txt}`}</p>
                
        </section>

}