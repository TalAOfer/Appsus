import { noteService } from '../apps/keep/services/note.service.js'
import { NoteList } from '../apps/keep/cmps/note-list.jsx'

export class AppKeep extends React.Component {
    state = {
        notes: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes() {
        noteService.query()
            .then(notes => this.setState({notes}))
    }

    render() {
        const {notes} = this.state

        return <section className="app-keep">
            <input type="text" placeholder="What's on your mind?"/>
            <NoteList notes={notes}/>
        </section>
    }

}