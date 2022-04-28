import { emailService } from "../apps/mail/services/mail.service.js";
import { MailSideBar } from "../apps/mail/cmps/mail-sidebar.jsx";
import { eventBusService } from "../../../services/event-bus-service.js";
import { EmailList } from "../apps/mail/cmps/mail-list.jsx";
// import { EmailList } from "./../apps/mail/cmps/mail-list.jsx";
// import { eventBusService } from "../services/event-bus-service.js";

// const { Link } = ReactRouterDOM;

export class AppEmail extends React.Component {
    state = {
        emails: '',
        selectedStatus: 'inbox',
        searchByTxt: ''
    }

    componentDidMount() {
        this.loadEmails()
        this.props.history.push('/email/inbox')
    }

    loadEmails = () => {
        const { selectedStatus, searchByTxt } = this.state
        emailService
            .query(selectedStatus, searchByTxt)
            .then((emails) => this.setState({ emails }))
            .then(() => {
                emailService.getUnreadMailsCount()
                    .then((count) => {
                        eventBusService.emit('unread-emails', count)
                    })
            })
    }

    getCurrStatus = (status) => {
        console.log(status);
        this.setState({ selectedStatus: status }, () => {
            this.loadEmails()
        })
    }

    getUpdateMail = (isRead, emailId) => {
        emailService.changeReadStatus(isRead, emailId)
            .then(() => {
                this.loadEmails()
            })
    }

    getUpdateStar = (isStared, emailId) => {
        emailService.changeStarStatus(isStared, emailId)
            .then(() => {
                this.loadEmails()
            })
    }

    getRemoveMail = (emailId) => {
        emailService.removeEmailMethod(emailId)
            .then(() => {
                this.loadEmails()
            })
    }

    getSerachTxt = (txt) => {
        console.log(txt);
        this.setState({ searchByTxt: txt }, () => {
            this.loadEmails()
        })
    }

    render() {
        const { emails } = this.state
        if (!emails) return <section>Loader...</section>
        return <section className="app-email">
            <MailSideBar status={this.getCurrStatus} />
            {/* <EmailList emails={emails}
                isReadUpdate={this.getUpdateMail}
                isStarUpdate={this.getUpdateStar}
                removeEmail={this.getRemoveMail}
                searchTxt={this.getSerachTxt} /> */}

        </section>
    }
}