export class NoteDetails extends React.Component {

    state = {
        text: this.props.note.info.txt,
        color: this.props.note.info.color
    }

    handleChange = ({ target }) => {
        console.log(target)
    }

    render() {
        const { note } = this.props
        console.log(note)
        let text = note.info.txt
        console.log(text)
        if (!text) text = ''

        return <section className="note-details">

            <div className="edit-container">
                <div className="text-container">
                    <textarea deafultValue={text} onChange={this.handleChange}>  </textarea>
                </div>

                <div className="edit-btns">
                    <div onClick={() => handleRemoveNote(note.id)} className="edit-btn"> <img src="../assets/img/keep/trash.png" alt="" /></div>
                    <label >
                        <img className="edit-btn" src="../assets/img/keep/palette.png" alt="" />
                        <input name={note.id} type="color" hidden onChange={this.handleInputChange} />
                    </label>
                </div>
            </div>

        </section>
    }
}