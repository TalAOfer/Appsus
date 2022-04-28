export class AddNote extends React.Component {
    state = {
        type: 'text',
        text: ''
    }

    onChangeInput = (type) => {
        this.setState({ type })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { text, type } = this.state
        this.props.handleAddNote(text, type)
        this.setState({ text: '' })
    }

    handleChange = ({ target }) => {
        const text = target.value
        this.setState({ text })
    }

    render() {
        const { type } = this.state

        return <section className="add-note">

            <form onSubmit={this.onSubmit}>
                {type === 'text' && <input value={this.state.text} type="text" placeholder="What's on your mind?" onChange={this.handleChange} />}
                {type === 'image' && <input value={this.state.text} type="text" placeholder="Enter img URL" onChange={this.handleChange} />}
                {type === 'video' && <input value={this.state.text} type="text" placeholder="Enter video URL" onChange={this.handleChange} />}
            </form>

            <div className="option-container">
                <div>
                    <img src="assets/img/keep/text.png" onClick={() => this.onChangeInput('text')} /></div>
                <div>
                    <img src="assets/img/keep/image.png" onClick={() => this.onChangeInput('image')}/>
                </div>
                <div>
                    <img src="assets/img/keep/video.png" onClick={() => this.onChangeInput('video')}/></div>
                <div>
                    {/* <img src="../assets/img/keep/todo.png" alt="" /> */}
                </div>
            </div>
        </section>
    }

}


// function DynamicCmp(props) {
//     switch (props.type) {
//         case 'text':
//             return <AddTextNote {...props} />
//         case 'image':
//             return <AddImageNote {...props} />
//     }
// }
