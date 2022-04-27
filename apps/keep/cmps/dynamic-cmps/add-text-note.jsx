import { noteService } from "../../services/note.service.js"

export class AddTextNote extends React.Component {

    state = {
        text: ''
    }
    
    onSubmit = (ev) => {
        ev.preventDefault()
        const {text} = this.state
        noteService.addNote(text, 'text')
            .then(this.setState({text:''}))
    }

    handleChange = ({target}) => {
        const text = target.value
        this.setState({text})
    }

    render() {
        return <section className="add-text-note">
            <form onSubmit={this.onSubmit}>
                <input value={this.state.text} type="text" placeholder="What's on your mind?" onChange={this.handleChange} />
            </form>
        </section>
    }
}
