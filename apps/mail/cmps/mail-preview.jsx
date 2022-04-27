const { Link } = ReactRouterDOM;

export class EmailsPreview extends React.Component {

    state = {
        selectedMail: false
    }

    onClickMail = () => {
        const { selectedMail } = this.state
        this.setState({ selectedMail: !selectedMail })
    }

    onClickIsRead = () => {
        const { email, isReadUpdate } = this.props
        isReadUpdate(!email.isRead, email.id)
    }

    onClickRemove = () => {
        const { email, removeEmail } = this.props
        removeEmail(email.id)
    }

    render() {
        const { email } = this.props
        const { selectedMail } = this.state

        const fromName = email.from.substring(0, email.from.indexOf("@", 0))
        const toName = email.to.substring(0, email.to.indexOf("@", 0))
        const displayName = (email.receivedAt) ? `From: ${fromName}` : `To: ${toName}`
        const displayEmail = (email.receivedAt) ? `${email.from}` : `${email.to}`

        const shortBody = `${email.body.substring(0, 50)}...`
        const displayTime = new Date(email.receivedAt).toLocaleTimeString('it-IT')
        const read_unread = email.isRead ? '' : 'unread-mail'
        const readTxt = email.isRead ? 'Make It UnRead' : 'Make It Read'

        return (
            <React.Fragment>
                <article onClick={this.onClickMail} className={`email-preview ${read_unread}`}>
                    <p className="mail-name">{displayName}</p>
                    <div className="txt-container">
                        <p className="mail-subject">{email.subject}</p>
                        <p className="mail-body">{shortBody}</p>
                    </div>
                    <p className="mail-time">{displayTime}</p>

                </article>
                {selectedMail &&
                    <div className="email-display">
                        <div className="fullmail-subject">
                            {email.subject}
                            <div className="fullmail-btn">
                            <button className="delete-mail" onClick={this.onClickRemove}>🗑</button>
                            <button className="expand-mail">⃞</button>
                            </div>
                        </div>
                        <p className="fullmail-name">{displayName} <span>{`<${displayEmail}>`}</span></p>
                        <p className="fullmail-body">{email.body}</p>
                        <p className="toggle-unread" onClick={this.onClickIsRead}>{readTxt}</p>

                    </div>}
            </React.Fragment >

        );
    }
}