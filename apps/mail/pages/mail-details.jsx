import { emailService } from "../services/mail.service.js";

export class EmailDetails extends React.Component {
    state = {
        email: ''
    }

    componentDidMount() {
        const emailId = this.props.match.path.substring(7)
        emailService.getEmailById(emailId)
            .then((email) => {
                this.setState({ email })
            })
    }

    componentWillUnmount() {
        this.onGoBack()
    }

    onGoBack = () => {
        this.props.history.push("/email");
    };

    render() {
        const { email } = this.state
        return (
            <div className="overlay">
                <section className="email-details">
                    <div className="compose-header">
                        <div className="new-msg">Message Details</div>
                        <button className="compose-btn-cls" onClick={this.onGoBack}>X</button>
                    </div>
                    <div className="details-main" ><span className="details-span">To: </span>{`${email.to}`}</div>
                    <div className="details-main"><span className="details-span">From:  </span>{`${email.from}`}:</div>
                    <div className="details-main"><span className="details-span">Subject: </span>{` ${email.subject}`}:</div>
                    <div className="details-body">{`${email.body}`}</div>
                </section>
            </div>
        )
    }

}

