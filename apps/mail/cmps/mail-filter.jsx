import { eventBusService } from "../../../services/event-bus-service.js"

export class EmailFilter extends React.Component {
    state = {
        searchByTxt: ''
    }

    handleChange = ({ target }) => {
        const { name } = target
        this.setState(() => ({ [name]: target.value }))
    }

    onSave = (ev) => {
        ev.preventDefault()
        const { searchByTxt } = this.state
        eventBusService.emit('search-txt', searchByTxt)
    }

    render() {
        const { searchByTxt } = this.state
        return (
            <section className='email-filter'>
                <form onSubmit={this.onSave}>
                    <input
                        type='search'
                        name='searchByTxt'
                        value={searchByTxt}
                        onChange={this.handleChange}
                        placeholder='Search mail'
                    />
                </form>
            </section>
        )
    }
}
