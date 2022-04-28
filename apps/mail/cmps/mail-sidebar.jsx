import { eventBusService } from "../../../services/event-bus-service.js";

const { NavLink } = ReactRouterDOM

export class MailSideBar extends React.Component {

    state = {
        unreadEmailsCount: ''
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('unread-emails', (unreadEmailsCount) => {
            this.setState({ unreadEmailsCount })
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    newEmailAdd = (email) => {
        console.log('New Email', email);
    }

    render() {
        const { status } = this.props
        const { unreadEmailsCount } = this.state
        const unreadEmailsCountFormat = Intl.NumberFormat("en-GB", { style: "percent" }).format(unreadEmailsCount);
        return <section className="mail-sidebar">
            <div className="sidebar-btn-container">
                <NavLink to={`/email/new_email`}><button className="sidbar-btn">+ Compose</button></NavLink>
            </div>
            <ul className="sidbar-list">
                <NavLink to="/email/inbox" ><li onClick={() => { status('inbox') }} className="filter-btn"><img src="../assets/img/mail/inbox.png"></img> &nbsp;&nbsp;&nbsp;&nbsp; Inbox </li></NavLink>
                <NavLink to="/email/starred" ><li onClick={() => { status('starred') }} className="filter-btn"> <img src="../assets/img/mail/star.png"></img> &nbsp;&nbsp;&nbsp;&nbsp; Starred </li></NavLink>
                <NavLink to="/email/sent" ><li onClick={() => { status('sent') }} className="filter-btn"> <img src="../assets/img/mail/sent.png"></img> &nbsp;&nbsp;&nbsp;&nbsp; Sent Mail </li></NavLink>
                <NavLink to="/email/Drafts" ><li onClick={() => { status('Drafts') }} className="filter-btn"> <img src="../assets/img/mail/draft.png"></img> &nbsp;&nbsp;&nbsp;&nbsp; Drafts </li></NavLink>
                <NavLink to="/email/trash" ><li onClick={() => { status('trash') }} className="filter-btn">  <img src="../assets/img/mail/trash.png"></img> &nbsp;&nbsp;&nbsp;&nbsp; Trash </li></NavLink>
            </ul>
            <div className="sidebar-precantage-container">
                <div className="sidebar-precantage" style={{width: unreadEmailsCount*100 + '%'}}>{unreadEmailsCountFormat}</div>
            </div>
        </section>                                       
    }
}

