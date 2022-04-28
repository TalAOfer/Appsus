import { noteService } from '../apps/keep/services/note.service.js'
import { NoteList } from '../apps/keep/cmps/note-list.jsx'
import { NoteFilter } from '../apps/keep/cmps/note-filter.jsx'
import { AddNote } from '../apps/keep/cmps/add-note.jsx'
import { eventBusService } from '../services/event-bus-service.js'

export class KeepApp extends React.Component {
    state = {
        notes: null,
        filterBy: null
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

    render() {
        const { notes } = this.state

        return <section className="app-keep">
            <NoteFilter handleFilterChange={this.handleFilterChange}/>
            <div className="main-container">
                <AddNote handleAddNote={this.handleAddNote}/>
                <NoteList notes={notes} handleRemoveNote={this.handleRemoveNote} handleColorChange={this.handleColorChange}/>
            </div>
        </section>
    }

}