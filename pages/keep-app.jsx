import { noteService } from '../apps/keep/services/note.service.js'
import { NoteList } from '../apps/keep/cmps/note-list.jsx'
import { NoteFilter } from '../apps/keep/cmps/note-filter.jsx'
import { AddNote } from '../apps/keep/cmps/add-note.jsx'
import { eventBusService } from '../services/event-bus-service.js'
import { NoteDetails } from '../apps/keep/pages/note-details.jsx'

export class KeepApp extends React.Component {
    state = {
        notes: null,
        filterBy: null,
        chosenNote: null
    }

    componentDidMount() {
        const {filterBy} = this.state
        this.loadNotes()
        eventBusService.emit('user-msg', {
            type: 'success', txt: 'Deleted car successfully'
        })
    }

    loadNotes() {
        const {filterBy} = this.state
        noteService.query(filterBy)
            .then(notes => this.setState({ notes }))
    }

    handleFilterChange = (filterBy) => {
        this.setState({filterBy}, this.loadNotes)
    }

    handleAddNote = (text, type) => {
        noteService.addNote(text, type)
                    .then(this.loadNotes())
    }

    handleRemoveNote = (id) => {
        noteService.removeNote(id)
                    .then(this.loadNotes())
    }

    handleColorChange = (id, color) => {
        noteService.changeNoteColor(id, color)
                    .then(this.loadNotes())
    } 

    handleChosenNote = (note) => {
        // console.log(note)
        this.setState({chosenNote: note})
    }

    onGoBack() {
        this.setState({chosenNote: null})
    }

    render() {
        const { notes, chosenNote } = this.state

        return <section className="app-keep">
            <NoteFilter handleFilterChange={this.handleFilterChange}/>
            <div className="main-container">
            {chosenNote && <NoteDetails note={chosenNote} onGoBack={this.onGoBack} handleRemoveNote={this.handleRemoveNote} handleColorChange={this.handleColorChange}/>}
            {!chosenNote && <React.Fragment>
                <AddNote handleAddNote={this.handleAddNote}/>
                <NoteList notes={notes} handleRemoveNote={this.handleRemoveNote} handleColorChange={this.handleColorChange} handleChosenNote={this.handleChosenNote}/>
            </React.Fragment>}
            </div>
        </section>
    }

}