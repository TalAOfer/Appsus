export function NotePreview({ note }) {

    return <section className="note-preview">
        {note.type === 'text' && <p>{`${note.info.txt}`}</p>}
        {note.type === 'image' && <img src={note.info.txt} alt="" />}
        {note.type === 'video' && <video src={note.info.txt} controls></video>}
        <div className="preview-btns">
            <div className="preview-btn"> <img src="../assets/img/keep/trash.png" alt="" /></div>
            <div className="preview-btn"> <img src="../assets/img/keep/palette.png" alt="" /></div>
        </div>
    </section>

}