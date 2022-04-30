import { eventBusService } from "../../../services/event-bus-service.js";

const { Route, NavLink, Link } = ReactRouterDOM;

export class EmailsPreview extends React.Component {

    state = {
        selectedMail: false
    }

    onClickMail = () => {
        const { selectedMail } = this.state
        const { email } = this.props
        this.setState({ selectedMail: !selectedMail })
        eventBusService.emit('email-id', email.id)
    }

    onClickIsRead = () => {
        const { email, isReadUpdate } = this.props
        isReadUpdate(!email.isRead, email.id)
    }

    onClickIsStared = () => {
        const { email, isStarUpdate } = this.props
        isStarUpdate(!email.isStared, email.id)
    }

    onClickRemove = () => {
        const { email, removeEmail } = this.props
        removeEmail(email.id)
    }

    onClickAddKeep = () => {
        const { email } = this.props
        eventBusService.emit('email-toKeep', email)
        eventBusService.emit('user-msg', {
            type: 'success', txt: 'Email save as note successfully'
        })
    }

    render() {
        const { email } = this.props
        const { selectedMail } = this.state

        const fromName = email.from.substring(0, email.from.indexOf("@", 0))
        const toName = email.to.substring(0, email.to.indexOf("@", 0))
        const displayName = (email.receivedAt) ? `From: ${fromName}` : `To: ${toName}`
        const displayEmail = (email.receivedAt) ? `${email.from}` : `${email.to}`

        const shortBody = `${email.body.substring(0, 50)}...`
        const meduimBody = `${email.body.substring(0, 200)}...`

        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "UTC",
        };

        const displayReceivedAt = new Intl.DateTimeFormat('en-GB', options).format(email.receivedAt)
        const displaySentAt = new Intl.DateTimeFormat('en-GB', options).format(email.sentAt)
        // const displayRemoveAt = new Date(email.removeAt).toLocaleTimeString('it-IT')
        const displayTimePerStatus = email.receivedAt ? displayReceivedAt : displaySentAt

        const read_unread = email.isRead ? '' : 'unread-mail'
        const readTxt = email.isRead ? 'Mark as unread' : 'Mark as read'
        const star = email.isStared ? 'starFill' : 'starUnFill'

        return (
            <React.Fragment>

                <article className={`email-preview ${read_unread}`}>
                    <img onClick={this.onClickIsStared} className="star-preview" src={`assets/img/mail/${star}.png`}></img>
                    <p onClick={this.onClickMail} className="mail-name">&nbsp;&nbsp;&nbsp;{displayName}</p>
                    <div onClick={this.onClickMail} className="txt-container">
                        <p className="mail-subject">{email.subject}</p>
                        <p className="mail-body">{shortBody}</p>
                    </div>
                    <p onClick={this.onClickMail} className="mail-time">{displayTimePerStatus}</p>

                </article>
                {selectedMail &&
                    <div className="email-display">
                        <div className="fullmail-subject">
                            {email.subject}
                            <div className="fullmail-btn">
                                <button className="delete-mail" onClick={this.onClickRemove}><img src="assets/img/mail/trash.png"></img></button>
                                <NavLink to={`/email/${email.id}`}><button className="expand-mail"><img src="assets/img/mail/expand.png"></img></button></NavLink>
                                <button className="keep-mail" onClick={this.onClickAddKeep}><img src="assets/img/mail/keepApp5.png"></img></button>

                            </div>
                        </div>
                        <p className="fullmail-name">{displayName} <span>{`<${displayEmail}>`}</span></p>
                        <p className="fullmail-body">{meduimBody}</p>
                        <p className="toggle-unread" onClick={this.onClickIsRead}>{readTxt}</p>

                    </div>}
            </React.Fragment >

        );
    }
}

