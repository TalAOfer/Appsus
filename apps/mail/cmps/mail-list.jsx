import { EmailsPreview } from "../cmps/mail-preview.jsx";
// import { EmailDetails } from "../pages/email-details.jsx";
// import { EmailCompose } from "../pages/email-compose.jsx";
import { eventBusService } from "../../../services/event-bus-service.js";

// import { EmailFilter } from "../../mail/cmps/mail-filter.jsx";
// import { EmailFilter } from "../cmps/mail-filter.jsx";

// import { EmailFilter } from "./../cmps/mail-filter.jsx";

const { Route, NavLink, Link } = ReactRouterDOM;

export class EmailList extends React.Component {

    state = {
        emailId: ''
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('email-id', (emailId) => {
            this.setState({ emailId })
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    render() {
        const { emails, isReadUpdate, removeEmail, isStarUpdate, searchTxt } = this.props
        const { emailId } = this.state
        return (
            <React.Fragment>
                <section className="email-list">
                    {/* <EmailFilter searchTxt={searchTxt}/> */}
                  
                    {emails.map((email) => (<EmailsPreview key={email.id} email={email} isReadUpdate={isReadUpdate} isStarUpdate={isStarUpdate} removeEmail={removeEmail} />))}
                </section>
            </React.Fragment>
        )
    }
}




