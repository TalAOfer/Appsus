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
        return <section className="email-details">
            <button className="details-btn-cls" onClick={this.onGoBack}>X</button>
            <div>{`To: ${email.to}`}</div> <hr />
            <div>{`From: ${email.from}`}:</div> <hr />
            <div>{`Subject: ${email.subject}`}:</div> <hr />
            <div>{`${email.body}`}</div>
        </section>
    }

}

