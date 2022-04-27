import { emailService } from "../apps/mail/services/mail.service.js";
import { MailDisplay } from "../apps/mail/pages/mail-display.jsx";
import { MailSideBar } from "../apps/mail/pages/mail-sidebar.jsx";

// import { BookFilter } from "../cmps/book-filter.jsx";
// import { GoogleBookApi } from "../cmps/book-api.jsx";
// import { eventBusService } from "../services/event-bus-service.js";

// const { Link } = ReactRouterDOM;

export class AppEmail extends React.Component {
    state = {
        emails: '',

    }

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => {
        emailService
            .query(/*this.state.filterBy*/)
            .then((emails) => this.setState({ emails }));
    }

    render() {
        return <section className="app-email">
            <MailSideBar />
            <MailDisplay />
        </section>
    }

}
