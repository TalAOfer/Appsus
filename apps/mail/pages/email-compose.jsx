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

    componentDidMount() {
        this.removeEvent = eventBusService.on('new-email', (newEmail) => {
            this.setState({ newEmail })
        })
        this.onDraft() //1
    }

    componentWillUnmount() {
        this.removeEvent() 
        this.clearInterval() //3
        this.loadMail() //4?
    }
    
    handleChange = ({ target }) => {
        const { name } = target
        this.setState((prevState) => ({ email: { ...prevState.email, [name]: target.value } }))
    }

    onDraft() { //2
        emailService.saveMailToDraft()
    }

    onSave = (ev) => {
        ev.preventDefault()
        const { email } = this.state
        emailService.saveEmail(email).then(() => {
            this.props.history.push('/email')
        })
        //5 remove Draft // !!!Remove send on Enter!!! and add required to all mail inputs
    }

    onGoBack = () => {
        this.props.history.push("/email");
    };


    render() {
        const { email } = this.state
        return (
            <section className='email-compose'>
                <button className="compose-btn-cls" onClick={this.onGoBack}>X</button>
                <form onSubmit={this.onSave}>
                    <label htmlFor='to'>To: </label>
                    <input
                        type='email'
                        id='to'
                        name='to'
                        value={email.to}
                        onChange={this.handleChange}
                        placeholder='Email'
                    />

                    <label htmlFor='subject'>Subject: </label>
                    <input
                        type='text'
                        id='subject'
                        name='subject'
                        value={email.subject}
                        onChange={this.handleChange}
                        placeholder='Subject'
                    />

                    <label htmlFor='body'>Body:</label>
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
        )
    }
}
