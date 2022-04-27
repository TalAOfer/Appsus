import { noteService } from '../apps/keep/services/note.service.js'
import { NoteList } from '../apps/keep/cmps/note-list.jsx'
import { NoteFilter } from '../apps/keep/cmps/note-filter.jsx'
import { AddNote } from '../apps/keep/cmps/add-note.jsx'

export class KeepApp extends React.Component {
    state = {
        notes: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes() {
        noteService.query()
            .then(notes => this.setState({ notes }))
    }

    render() {
        const { notes } = this.state

        return <section className="app-keep">
            <NoteFilter />
            <div className="main-container">
                <AddNote/>
                <NoteList notes={notes} />
            </div>
        </section>
    }

}