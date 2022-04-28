import { eventBusService } from "../../../services/event-bus-service.js";

const {NavLink} = ReactRouterDOM

export class NotePreview extends React.Component{

    handleInputChange = ({target}) => {
        const color = target.value
        const id = target.name
        this.props.handleColorChange(id, color)
    }

    handleMail = () => {
        // eventBusService.emit('unread-emails', email)
        console.log('handled')
    }

    render() {
    const { note, handleRemoveNote, handleChosenNote, handlePinChange} = this.props 
    const pinType = (note.isPinned) ? 'unpin' : 'pin'

    return <section className="note-preview" style={{backgroundColor: note.info.color}}>
        {note.type === 'text' && <p >{`${note.info.txt}`}</p>}
        {note.type === 'image' && <img src={note.info.txt} alt="" />}
        {note.type === 'video' && <video src={note.info.txt} controls></video>}
        <div className="preview-btns">
            <div onClick={()=>handleRemoveNote(note.id)}  className="preview-btn"> <img src="../assets/img/keep/trash.png" alt="" /></div>
            <label >
            <img className="preview-btn" src="../assets/img/keep/palette.png" alt=""/>
            <input name={note.id} type="color" hidden onChange={this.handleInputChange}/>
            </label>
            <div onClick={()=>handleChosenNote(note)}  className="preview-btn"> <img src="../assets/img/keep/pencil.png" alt="" /></div>
            <div onClick={()=>handlePinChange(note.id)} className="preview-btn"> <img src={`../assets/img/keep/${pinType}.png`} alt="" /></div>
            <NavLink to="/email/new_email" ><div onClick={()=>this.handleMail(note.id)} className="preview-btn"> MAIL </div></NavLink>

            
        </div>
    </section>
    }
}