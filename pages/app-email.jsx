import { emailService } from "../apps/mail/services/mail.service.js";
import { MailSideBar } from "../apps/mail/cmps/mail-sidebar.jsx";

import { EmailList } from "../apps/mail/cmps/mail-list.jsx";
// import { GoogleBookApi } from "../cmps/book-api.jsx";
// import { eventBusService } from "../services/event-bus-service.js";

// const { Link } = ReactRouterDOM;

export class AppEmail extends React.Component {
    state = {
        emails: '',
        selectedStatus: 'inbox'
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService
            .query(this.state.selectedStatus)
            .then((emails) => this.setState({ emails }));
    }

    getCurrStatus = (status) => {
        console.log(status);
        this.setState({selectedStatus: status}, ()=>{
            this.loadEmails()
        })
    }

    getUpdateMail = (isRead, emailId) => {
        emailService.changeReadStatus(isRead, emailId)
            .then(()=> {
                this.loadEmails()
            })
    }

    getRemoveMail = (emailId) => {
        emailService.removeEmailMethod(emailId)
            .then(()=> {
                this.loadEmails()
            })
    }

    render() {
        const {emails} = this.state
        if (!emails) return <section>Loader...</section>
        return <section className="app-email">
            <MailSideBar status={this.getCurrStatus}/>
            <EmailList emails={emails} isReadUpdate={this.getUpdateMail} removeEmail={this.getRemoveMail}/>
        </section>
    }

}
