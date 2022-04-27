
export class NoteFilter extends React.Component {
    state = {
        notes: null
    }

    componentDidMount() {
        // this.loadNotes()
    }

    loadNotes() {
        // noteService.query()
        //     .then(notes => this.setState({notes}))
    }

    render() {

        return <section className="note-filter">
            <input type="text" placeholder="Search a note" className="filter-input"/>
            <div className="filter-btn"> Text </div>
            <div className="filter-btn"> Images </div>
            <div className="filter-btn"> Videos </div>
            <div className="filter-btn"> Todos </div>
        </section>
    }

}