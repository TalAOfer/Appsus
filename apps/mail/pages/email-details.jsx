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
            <div><span className="details-span">To: </span>{`${email.to}`}</div> <hr /> 
            <div><span className="details-span">From:  </span>{`${email.from}`}:</div> <hr />
            <div><span className="details-span">Subject: </span>{` ${email.subject}`}:</div> <hr />
            <div className="details-body">{`${email.body}`}</div>
        </section>
    }

}

