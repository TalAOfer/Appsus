import { noteService } from "../../services/note.service.js"

export class AddImageNote extends React.Component {

    state = {
        text: ''
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const {text} = this.state
        noteService.addNote(text, 'image')
            .then(this.setState({text:''}))
    }

    handleChange = ({target}) => {
        const text = target.value
        this.setState({text})
    }

    render() {
        return <section className="add-text-note">
            <form onSubmit={this.onSubmit}>
                <input value={this.state.text} type="text" placeholder="Enter img URL" onChange={this.handleChange} />
            </form>
        </section>
    }
}
