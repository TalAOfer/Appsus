import { eventBusService } from "../services/event-bus-service.js"

export class UserMsg extends React.Component {

    state = {
        msg: null,
        emailId: null,
        unReadEmails: null,
        newEmail: null
    }

    removeEvent;
    timeoutId;

    componentDidMount() {
        this.removeEvent = eventBusService.on('user-msg', (msg) => {
            this.setState({ msg })
            if (this.timeoutId) clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(this.onCloseMsg, 3000)
        })

        this.removeEvent = eventBusService.on('email-id', (emailId) => {
            this.setState({ emailId })
        })

        this.removeEvent = eventBusService.on('unread-emails', (unReadEmails) => {
            this.setState({ unReadEmails })
        })

        this.removeEvent = eventBusService.on('new-email', (newEmail) => {
            this.setState({ newEmail })
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    onCloseMsg = () => {
        this.setState({ msg: null })
        clearTimeout(this.timeoutId)
    }

    render() {
        const { msg } = this.state
        if (!msg) return <React.Fragment></React.Fragment>
        return <div className={`user-msg ${msg.type}`}>
            <button onClick={this.onCloseMsg}>X</button>
            {msg.txt}
        </div>
    }
}