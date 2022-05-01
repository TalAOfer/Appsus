import { emailService } from "../services/mail.service.js";
import { eventBusService } from "../../../services/event-bus-service.js";

export class EmailCompose extends React.Component {
    state = {
        email: {
            to: '',
            subject: '',
            body: '',
            isRead: true
        },
    }
    removeEvents;

    componentDidMount() {
        this.removeEvents = eventBusService.on('keep-compose', (keepToEmail) => {
            this.setState({ email: { ...this.state.email, body: keepToEmail } })
        })
    }

    componentWillUnmount() {
        this.removeEvents()

    }

    handleChange = ({ target }) => {
        const { name } = target
        this.setState((prevState) => ({ email: { ...prevState.email, [name]: target.value } }))
    }

    onSent = (ev) => {
        ev.preventDefault()
        const { email } = this.state
        emailService.saveEmail(email).then(() => {
            this.props.history.push('/email')
        }).then(() => {
            eventBusService.emit('user-msg', {
                type: 'success', txt: 'Email sent successfully'
            })
        }).catch(() => {
            eventBusService.emit('user-msg', {
                type: 'danger', txt: 'Could not sent message :('
            })
        })
    }

    onGoBack = () => {
        this.props.history.push("/email");
    };

    render() {
        const { email } = this.state
        return (
            <div className="overlay">
                <section className='email-compose'>
                    <div className="compose-header">
                        <div className="new-msg">New Message</div>
                        <button className="compose-btn-cls" onClick={this.onGoBack}>X</button>
                    </div>
                    <form onSubmit={this.onSent}>
                        <input
                            type='email'
                            id='to'
                            name='to'
                            value={email.to}
                            onChange={this.handleChange}
                            placeholder='Recipients'
                        />

                        <input
                            type='text'
                            id='subject'
                            name='subject'
                            value={email.subject}
                            onChange={this.handleChange}
                            placeholder='Subject'
                        />

                        <textarea
                            id='body'
                            name='body'
                            value={email.body}
                            onChange={this.handleChange}
                            rows='10'
                            cols='30'
                        ></textarea>


                        <input className='send-btn' type='submit' value='Send' />
                    </form>
                </section>
            </div>
        )
    }
}
